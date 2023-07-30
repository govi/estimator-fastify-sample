import makeRequest from './makeRequest'

const _createFeasibilityPayload = (limit: number, lengthOfInterview: number, fieldPeriod: number) => {
  return {
      'incidenceRate': 100,
      'countryId': 1,
      'quotaGroups': [
        {
          'quotas': [
            {
              'limit': limit,
              'targetGroup': {
                'minAge': 18,
                'maxAge': 99
              }
            }
          ]
        }
      ],
      'limit': limit,
      'lengthOfInterview': lengthOfInterview,
      'fieldPeriod': fieldPeriod
    }
}

interface FeasibilityEstimateRequest {
  limit: number
  lengthOfInterview: number
  fieldPeriod: number
}

const fetchFeasibilityEstimates = async (request: FeasibilityEstimateRequest): Promise<number> => {
  const payload = _createFeasibilityPayload(request.limit, request.lengthOfInterview, request.fieldPeriod)
  const data = await makeRequest('ordering/FeasibilityEstimates', payload)
  return data?.['feasibility']
}

export default fetchFeasibilityEstimates