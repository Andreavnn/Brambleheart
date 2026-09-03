import { isCoreActionSource, type AbilityProcSource } from './abilityProc'

export type AbilityChainInstanceScope=string

export interface AbilityChainState {
  coreActionId:string
  resolvedAbilityInstances:Set<string>
  spentReactionScopes:Set<AbilityChainInstanceScope>
}

export function createAbilityChainState(coreAction:AbilityProcSource):AbilityChainState{
  return{coreActionId:coreAction.id,resolvedAbilityInstances:new Set(),spentReactionScopes:new Set()}
}

export function cloneAbilityChainState(state:AbilityChainState):AbilityChainState{
  return{coreActionId:state.coreActionId,resolvedAbilityInstances:new Set(state.resolvedAbilityInstances),spentReactionScopes:new Set(state.spentReactionScopes)}
}

/**
 * One Ability instance is one specific actor/source copy of an Ability.
 * Two characters may possess the same named Ability; their instance scopes differ.
 */
export function abilityInstanceKey(ability:AbilityProcSource,instanceScope:AbilityChainInstanceScope='self'){
  return`${instanceScope}::${ability.id}`
}

export function canResolveAbilityInChain(state:AbilityChainState,ability:AbilityProcSource,instanceScope:AbilityChainInstanceScope='self'){
  if(isCoreActionSource(ability))return true
  return!state.resolvedAbilityInstances.has(abilityInstanceKey(ability,instanceScope))
}

export function recordAbilityResolution(state:AbilityChainState,ability:AbilityProcSource,instanceScope:AbilityChainInstanceScope='self'){
  const next=cloneAbilityChainState(state)
  if(!isCoreActionSource(ability))next.resolvedAbilityInstances.add(abilityInstanceKey(ability,instanceScope))
  return next
}

export function canSpendReaction(state:AbilityChainState,instanceScope:AbilityChainInstanceScope='self'){
  return!state.spentReactionScopes.has(instanceScope)
}

export function recordReaction(state:AbilityChainState,instanceScope:AbilityChainInstanceScope='self'){
  const next=cloneAbilityChainState(state)
  next.spentReactionScopes.add(instanceScope)
  return next
}
