import Vue from 'vue'

export function updateInformationText (state, text) {
  state.informationText = text
}

export function updateClusters (state, clusters) {
  state.clusters = clusters
}

export function updateSelectedCluster (state, cluster) {
  state.clustersView.selected = cluster
}

export function updateSelectedEndpoint (state, endpoint) {
  state.endpointView.selectedEndpoint = endpoint
}

export function updateAttributes (state, attributes) {
  attributes.forEach(attribute => {
    if (state.attributeView.defaultValues[attribute.id] === undefined) {
      Vue.set(state.attributeView.defaultValues, attribute.id, attribute.defaultValue)
    }
    if (state.reportingView.reportingMin[attribute.id] === undefined) {
      Vue.set(state.reportingView.reportingMin, attribute.id, 0)
    }
    if (state.reportingView.reportingMax[attribute.id] === undefined) {
      Vue.set(state.reportingView.reportingMax, attribute.id, 65344)
    }
    if (state.reportingView.reportableChange[attribute.id] === undefined) {
      Vue.set(state.reportingView.reportableChange, attribute.id, 0)
    }
  })
  state.attributes = attributes
}

export function initializeDefaultEndpoints (state, defaultEndpoints) {
  defaultEndpoints.forEach(endpoint => {
    if (state.endpointView.endpointId[endpoint.id] === undefined) {
      Vue.set(state.endpointView.endpointId, endpoint.id, endpoint.eptId)
    }
    if (state.endpointView.endpointType[endpoint.id] === undefined) {
      Vue.set(state.endpointView.endpointType, endpoint.id, endpoint.endpointType)
    }
    if (state.endpointView.networkId[endpoint.id] === undefined) {
      Vue.set(state.endpointView.networkId, endpoint.id, endpoint.network)
    }
  })
}

export function addEndpoint (state, endpoint) {
  Vue.set(state.endpointView.endpointId, endpoint.id, endpoint.eptId)
  Vue.set(state.endpointView.endpointType, endpoint.id, endpoint.endpointType)
  Vue.set(state.endpointView.networkId, endpoint.id, endpoint.network)
}

export function updateEndpoint (state, context) {
  Vue.set(state.endpointView[context.updatedKey], context.endpointId, context.updatedValue)
}

export function initializeDefaultEndpointsTypes (state, defaultEndpointsTypes) {
  defaultEndpointsTypes.forEach(endpointType => {
    if (state.endpointTypeView.name[endpointType.id] === undefined) {
      Vue.set(state.endpointTypeView.name, endpointType.id, endpointType.name)
    }
    if (state.endpointTypeView.deviceTypeRef[endpointType.id] === undefined) {
      Vue.set(state.endpointTypeView.deviceTypeRef, endpointType.id, endpointType.deviceTypeRef)
    }
  })
}

export function addEndpointType (state, endpointType) {
  Vue.set(state.endpointTypeView.name, endpointType.id, endpointType.name)
  Vue.set(state.endpointTypeView.deviceTypeRef, endpointType.id, endpointType.deviceTypeRef)
}

export function updateReportingAttributeDefaults (state, selectionContext) {
  Vue.set(state.reportingView[selectionContext.listType], selectionContext.id, selectionContext.newDefaultValue)
}

export function updateAttributeDefaults (state, selectionContext) {
  Vue.set(state.attributeView.defaultValues, selectionContext.id, selectionContext.newDefaultValue)
}

export function updateCommands (state, commands) {
  state.commands = commands
}

export function updateZclDeviceTypes (state, zclDeviceTypes) {
  state.zclDeviceTypes = zclDeviceTypes
}

export function updateEndpointConfigs (state, endpoints) {
  state.endpoints = endpoints
}

export function selectConfiguration (state, configurationName) {
  state.configurationView.selected = configurationName
}

export function updateInclusionList (state, selectionContext) {
  var inclusionList = state[selectionContext.view][selectionContext.listType]
  if (selectionContext.added) {
    inclusionList.push(selectionContext.id)
  } else {
    var elementIndex = inclusionList.indexOf(selectionContext.id)
    inclusionList.splice(elementIndex, 1)
  }
  state[selectionContext.view][selectionContext.listType] = inclusionList
}

export function setDeviceTypeReference (state, endpointIdDeviceTypeRefPair) {
  Vue.set(state.endpointTypeView.deviceTypeRef, endpointIdDeviceTypeRefPair.endpointId, endpointIdDeviceTypeRefPair.deviceTypeRef)
}

export function updateSelectedEndpointType (state, endpointType) {
  state.endpointTypeView.selectedEndpointType = endpointType
}

export function removeEndpointType (state, endpointType) {
  state.endpointTypeView.selectedEndpointType = []
  Vue.delete(state.endpointTypeView.name, endpointType.id)
  Vue.delete(state.endpointTypeView.deviceTypeRef, endpointType.id)
}

export function deleteEndpoint (state, endpoint) {
  state.endpointView.selectedEndpoint = []
  Vue.delete(state.endpointView.endpointId, endpoint.id)
  Vue.delete(state.endpointView.endpointType, endpoint.id)
  Vue.delete(state.endpointView.networkId, endpoint.id)
}

export function setClusterList (state, data) {
  state.clustersView.selectedClients = data.clients
  state.clustersView.selectedServers = data.servers
}

export function resetAttributeDefaults (state) {
  state.attributeView.defaultValues = {}
  state.attributes.forEach(attribute => {
    Vue.set(state.attributeView.defaultValues, attribute.id, attribute.defaultValue)
  })
}

export function resetReportableAttributeDefaults (state) {
  state.reportingView.reportingMin = {}
  state.reportingView.reportingMin = {}
  state.reportingView.reportableChange = {}
  state.attributes.forEach(attribute => {
    Vue.set(state.reportingView.reportingMin, attribute.id, 0)
    Vue.set(state.reportingView.reportingMax, attribute.id, 65344)
    Vue.set(state.reportingView.reportableChange, attribute.id, 0)
  })
}

export function setAttributeLists (state, data) {
  state.attributeView.selectedAttributes = data.included
  state.attributeView.selectedExternal = data.external
  state.attributeView.selectedFlash = data.flash
  state.attributeView.selectedSingleton = data.singleton
  state.attributeView.selectedBounded = data.bounded
  resetAttributeDefaults(state)
  Object.entries(data.defaultValue).forEach(([attributeRef, defaultVal]) => {
    Vue.set(state.attributeView.defaultValues, attributeRef, defaultVal)
  })
}

export function setReportableAttributeLists (state, data) {
  state.reportingView.selectedReporting = data.included
  resetReportableAttributeDefaults(state)
  Object.entries(data.minInterval).forEach(([attributeRef, defaultVal]) => {
    Vue.set(state.reportingView.reportingMin, attributeRef, defaultVal)
  })

  Object.entries(data.maxInterval).forEach(([attributeRef, defaultVal]) => {
    Vue.set(state.reportingView.reportingMax, attributeRef, defaultVal)
  })
  Object.entries(data.reportableChange).forEach(([attributeRef, defaultVal]) => {
    Vue.set(state.reportingView.reportableChange, attributeRef, defaultVal)
  })
}

export function setCommandLists (state, data) {
  state.commandView.selectedIn = data.incoming
  state.commandView.selectedOut = data.outgoing
}

export function setRecommendedClusterList (state, data) {
  Vue.set(state.clustersView, 'recommendedClients', data.recommendedClients)
  Vue.set(state.clustersView, 'recommendedServers', data.recommendedServers)
}

export function setRequiredAttributesList (state, data) {
  Vue.set(state.attributeView, 'requiredAttributes', data.requiredAttributes)
}

export function setRequiredCommandsList (state, data) {
  Vue.set(state.commandView, 'requiredCommands', data.requiredCommands)
}
