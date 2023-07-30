import makeRequest from './makeCintRequest'

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


const cintFetchFeasibilityEstimates = async (limit: number, lengthOfInterview: number, fieldPeriod: number): Promise<number> => {
  const payload = _createFeasibilityPayload(limit, lengthOfInterview, fieldPeriod)
  const data = await makeRequest('ordering/FeasibilityEstimates', payload)
  console.log('cintFetchFeasibilityEstimates', data)
  return data?.['feasibility']
}

export default cintFetchFeasibilityEstimates