import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const formatPrice = (value) => Number(value || 0).toLocaleString('en-PH', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const parsePrice = (value) => {
  const numericValue = Number(value)
  if (!Number.isFinite(numericValue) || numericValue < 0) return null
  return numericValue
}

const toTitleCase = (value) => {
  const raw = `${value ?? ''}`
  if (!raw.trim()) return raw
  return raw
    .toLowerCase()
    .replace(/\b[a-z]/g, (match) => match.toUpperCase())
}

const normalizeLegendCode = (value) => `${value ?? ''}`.trim().toUpperCase()
const normalizeConditionName = (value) => `${value ?? ''}`.trim().replace(/\s+/g, ' ').toLowerCase()

function Procedures() {
  const [tab, setTab] = useState('services')
  const [services, setServices] = useState([])
  const [legends, setLegends] = useState([])
  const [addServiceName, setAddServiceName] = useState('')
  const [addServicePrice, setAddServicePrice] = useState('')
  const [addConditionName, setAddConditionName] = useState('')
  const [addLegendCode, setAddLegendCode] = useState('')
  const [modal, setModal] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [editServiceName, setEditServiceName] = useState('')
  const [editServicePrice, setEditServicePrice] = useState('')
  const [editCondition, setEditCondition] = useState('')
  const [editLegendCode, setEditLegendCode] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const closeModal = () => {
    setModal(null)
    setSelectedItem(null)
  }

  const showSuccess = (message) => {
    setSuccessMessage(message)
    setModal('success')
  }

  const loadData = async () => {
    setLoading(true)
    setError('')

    const [{ data: serviceData, error: serviceError }, { data: legendData, error: legendError }] = await Promise.all([
      supabase.from('services').select('id, service_name, price, is_active, created_at').order('service_name', { ascending: true }),
      supabase.from('tooth_conditions').select('id, code, condition_name, is_active, created_at').order('code', { ascending: true }),
    ])

    if (serviceError || legendError) {
      setError(serviceError?.message ?? legendError?.message ?? 'Unable to load procedures.')
      setServices([])
      setLegends([])
      setLoading(false)
      return
    }

    setServices(serviceData ?? [])
    setLegends(legendData ?? [])
    setLoading(false)
  }

  useEffect(() => {
    const bootstrapTimer = setTimeout(() => {
      void loadData()
    }, 0)

    return () => clearTimeout(bootstrapTimer)
  }, [])

  const activeServices = useMemo(() => services.filter((item) => item.is_active), [services])
  const activeLegends = useMemo(() => legends.filter((item) => item.is_active), [legends])
  const normalizeServiceName = (value) => `${value ?? ''}`.trim().replace(/\s+/g, ' ').toLowerCase()
  const findServiceDuplicate = ({ name, excludeId = null }) => {
    const normalizedName = normalizeServiceName(name)
    return services.find((item) => {
      if (excludeId && item.id === excludeId) return false
      return normalizeServiceName(item.service_name) === normalizedName
    })
  }
  const findLegendDuplicate = ({ code, condition, excludeId = null }) => {
    const normalizedCode = normalizeLegendCode(code)
    const normalizedCondition = normalizeConditionName(condition)

    return legends.find((item) => {
      if (excludeId && item.id === excludeId) return false
      return normalizeLegendCode(item.code) === normalizedCode || normalizeConditionName(item.condition_name) === normalizedCondition
    })
  }

  const openEdit = (item) => {
    setSelectedItem(item)
    if (tab === 'services') {
      setEditServiceName(item.service_name)
      setEditServicePrice(`${item.price ?? ''}`)
      setModal('edit-service')
      return
    }
    setEditCondition(item.condition_name)
    setEditLegendCode(item.code)
    setModal('edit-legend')
  }

  const openArchive = (item) => {
    setSelectedItem(item)
    setModal('archive')
  }

  const addService = async () => {
    const serviceName = toTitleCase(addServiceName.trim())
    const price = parsePrice(addServicePrice)
    if (!serviceName || price === null) {
      setError('Enter a valid service name and non-negative price.')
      return
    }

    const duplicateService = findServiceDuplicate({ name: serviceName })
    if (duplicateService) {
      setError(`Service already exists (${duplicateService.service_name}). It was not added.`)
      return
    }

    const { error: insertError } = await supabase
      .from('services')
      .insert({ service_name: serviceName, price, description: serviceName })

    if (insertError) {
      if (insertError.code === '23505') {
        setError('Service already exists. It was not added.')
        return
      }
      setError(insertError.message)
      return
    }

    setAddServiceName('')
    setAddServicePrice('')
    await loadData()
    showSuccess('Added successfully')
  }

  const handleAddCondition = async () => {
    const normalizedCode = normalizeLegendCode(addLegendCode)
    const normalizedCondition = toTitleCase(addConditionName.trim())
    if (!normalizedCondition || !normalizedCode) {
      setError('Enter both legend code and tooth condition.')
      return
    }

    const duplicateLegend = findLegendDuplicate({ code: normalizedCode, condition: normalizedCondition })
    if (duplicateLegend) {
      setError(`Condition already exists (${duplicateLegend.code} - ${duplicateLegend.condition_name}). It was not added.`)
      return
    }

    const { error: insertError } = await supabase
      .from('tooth_conditions')
      .insert({ code: normalizedCode, condition_name: normalizedCondition, description: normalizedCondition })

    if (insertError) {
      if (insertError.code === '23505') {
        setError('Condition already exists. It was not added.')
        return
      }
      setError(insertError.message)
      return
    }

    setAddConditionName('')
    setAddLegendCode('')
    await loadData()
    showSuccess('Added successfully')
  }

  const updateSelected = async () => {
    if (!selectedItem) return

    if (tab === 'services') {
      const nextName = toTitleCase(editServiceName.trim())
      const nextPrice = parsePrice(editServicePrice)
      if (!nextName || nextPrice === null) {
        setError('Enter a valid service name and non-negative price.')
        return
      }

      const duplicateService = findServiceDuplicate({ name: nextName, excludeId: selectedItem.id })
      if (duplicateService) {
        setError(`Service already exists (${duplicateService.service_name}). Update was not applied.`)
        return
      }

      const { error: updateError } = await supabase
        .from('services')
        .update({
          service_name: nextName,
          price: nextPrice,
          description: nextName,
          updated_by: (await supabase.auth.getUser()).data.user?.id ?? null,
        })
        .eq('id', selectedItem.id)

      if (updateError) {
        if (updateError.code === '23505') {
          setError('Service already exists. Update was not applied.')
          return
        }
        setError(updateError.message)
        return
      }
    } else {
      const nextCode = normalizeLegendCode(editLegendCode)
      const nextCondition = toTitleCase(editCondition.trim())
      if (!nextCode || !nextCondition) {
        setError('Enter both legend code and tooth condition.')
        return
      }

      const duplicateLegend = findLegendDuplicate({
        code: nextCode,
        condition: nextCondition,
        excludeId: selectedItem.id,
      })
      if (duplicateLegend) {
        setError(`Condition already exists (${duplicateLegend.code} - ${duplicateLegend.condition_name}). Update was not applied.`)
        return
      }

      const { error: updateError } = await supabase
        .from('tooth_conditions')
        .update({ code: nextCode, condition_name: nextCondition, description: nextCondition, updated_by: (await supabase.auth.getUser()).data.user?.id ?? null })
        .eq('id', selectedItem.id)

      if (updateError) {
        if (updateError.code === '23505') {
          setError('Condition already exists. Update was not applied.')
          return
        }
        setError(updateError.message)
        return
      }
    }

    await loadData()
    closeModal()
    showSuccess('Updated successfully')
  }

  const confirmArchive = async () => {
    if (!selectedItem) return

    if (tab === 'services') {
      const { error: updateError } = await supabase
        .from('services')
        .update({ is_active: false, updated_by: (await supabase.auth.getUser()).data.user?.id ?? null })
        .eq('id', selectedItem.id)

      if (updateError) {
        setError(updateError.message)
        return
      }
    } else {
      const { error: updateError } = await supabase
        .from('tooth_conditions')
        .update({ is_active: false, updated_by: (await supabase.auth.getUser()).data.user?.id ?? null })
        .eq('id', selectedItem.id)

      if (updateError) {
        setError(updateError.message)
        return
      }
    }

    await loadData()
    closeModal()
    showSuccess('Archived successfully')
  }

  return (
    <>
      <header className="page-header">
        <h1>Procedures</h1>
      </header>

      <section className="panel tabs-panel procedures-panel">
        <div className="panel-tabs large add-patient-tabs compact-tabs">
          <button type="button" className={`tab ${tab === 'services' ? 'active' : ''}`} onClick={() => setTab('services')}>
            Services
          </button>
          <button type="button" className={`tab ${tab === 'legend' ? 'active' : ''}`} onClick={() => setTab('legend')}>
            Dental Chart Legend
          </button>
        </div>

        {error ? <p className="error">{error}</p> : null}
        {loading ? <p>Loading procedures...</p> : null}

        <div className="grid-two procedures-grid">
          <div className="panel-card procedures-list-card">
            <h2>{tab === 'services' ? 'List of Services' : 'Dental Chart Legends'}</h2>
            <div className="simple-table">
              <div className="simple-head">
                {tab === 'services' ? (
                  <>
                    <span>Service name</span>
                    <span>Price (PHP)</span>
                    <span>Actions</span>
                  </>
                ) : (
                  <>
                    <span>Legend</span>
                    <span>Tooth Condition</span>
                    <span>Actions</span>
                  </>
                )}
              </div>
              <div className="simple-body">
                {(tab === 'services' ? activeServices : activeLegends).map((item) => (
                  <div key={item.id} className="simple-row">
                    <span>{tab === 'services' ? item.service_name : item.code}</span>
                    <span>{tab === 'services' ? formatPrice(item.price) : item.condition_name}</span>
                    <span className="row-actions">
                      <button type="button" className="icon-btn" onClick={() => openEdit(item)}>&#9998;</button>
                      <button type="button" className="icon-btn danger" onClick={() => openArchive(item)}>&#8681;</button>
                    </span>
                  </div>
                ))}
                {!loading && (tab === 'services' ? activeServices.length : activeLegends.length) === 0 ? <p>No entries yet.</p> : null}
              </div>
            </div>
          </div>

          <div className="panel-card procedures-form-card">
            <h2>{tab === 'services' ? 'Add Service' : 'Add a Condition'}</h2>
            <div className="stack">
              <label>
                {tab === 'services' ? 'Service Name' : 'Tooth condition'}
                <input
                  type="text"
                  value={tab === 'services' ? addServiceName : addConditionName}
                  onChange={(event) =>
                    tab === 'services'
                      ? setAddServiceName(toTitleCase(event.target.value))
                      : setAddConditionName(toTitleCase(event.target.value))
                  }
                />
              </label>
              {tab === 'services' ? (
                <label>
                  Price (PHP)
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="0.01"
                    value={addServicePrice}
                    onChange={(event) => setAddServicePrice(event.target.value)}
                  />
                </label>
              ) : null}
              {tab === 'legend' ? (
                <label>
                  Legend
                  <input type="text" value={addLegendCode} onChange={(event) => setAddLegendCode(event.target.value)} />
                </label>
              ) : null}
              <button type="button" className="primary wide" onClick={() => { void (tab === 'services' ? addService() : handleAddCondition()) }}>
                Add
              </button>
            </div>
          </div>
        </div>
      </section>

      {modal ? <div className="modal-backdrop" onClick={closeModal} /> : null}

      {modal === 'edit-service' ? (
        <div className="pr-modal procedures-modal">
          <div className="pr-modal-head"><h2>Update</h2><button type="button" onClick={closeModal}>X</button></div>
          <div className="pr-modal-body">
            <div className="stack">
              <label>Service Name<input type="text" value={editServiceName} onChange={(e) => setEditServiceName(toTitleCase(e.target.value))} /></label>
              <label>
                Price (PHP)
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  value={editServicePrice}
                  onChange={(event) => setEditServicePrice(event.target.value)}
                />
              </label>
            </div>
            <div className="modal-actions">
              <button type="button" className="danger-btn" onClick={closeModal}>Cancel</button>
              <button type="button" className="success-btn" onClick={() => { void updateSelected() }}>Update</button>
            </div>
          </div>
        </div>
      ) : null}

      {modal === 'edit-legend' ? (
        <div className="pr-modal procedures-modal">
          <div className="pr-modal-head"><h2>Update</h2><button type="button" onClick={closeModal}>X</button></div>
          <div className="pr-modal-body">
            <div className="stack">
              <label>Tooth Condition<input type="text" value={editCondition} onChange={(e) => setEditCondition(toTitleCase(e.target.value))} /></label>
              <label>Legend<input type="text" value={editLegendCode} onChange={(e) => setEditLegendCode(e.target.value)} /></label>
            </div>
            <div className="modal-actions">
              <button type="button" className="danger-btn" onClick={closeModal}>Cancel</button>
              <button type="button" className="success-btn" onClick={() => { void updateSelected() }}>Update</button>
            </div>
          </div>
        </div>
      ) : null}

      {modal === 'archive' ? (
        <div className="pr-modal procedures-modal archive-modal">
          <div className="pr-modal-head"><h2>Archive</h2></div>
          <div className="pr-modal-body">
            <p>
              {tab === 'services'
                ? 'Are you sure you want to archive this service?'
                : 'Are you sure you want to archive this tooth condition?'}
            </p>
            <div className="modal-actions">
              <button type="button" className="danger-btn" onClick={closeModal}>No</button>
              <button type="button" className="success-btn" onClick={() => { void confirmArchive() }}>Yes</button>
            </div>
          </div>
        </div>
      ) : null}

      {modal === 'success' ? (
        <div className="pr-modal procedures-modal success-modal">
          <div className="pr-modal-head"><h2>&nbsp;</h2></div>
          <div className="pr-modal-body">
            <p>{successMessage}</p>
            <div className="modal-actions center">
              <button type="button" className="success-btn" onClick={closeModal}>Done</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Procedures
