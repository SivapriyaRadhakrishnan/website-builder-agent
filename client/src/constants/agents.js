export const agents = [
  'RequirementAgent', 'PlannerAgent', 'ProjectAgent', 'PackageAgent',
  'RoutingAgent', 'ComponentAgent', 'PageAgent', 'StylingAgent',
]

export const emptyStatuses = () => Object.fromEntries(agents.map((agent) => [agent, 'pending']))
