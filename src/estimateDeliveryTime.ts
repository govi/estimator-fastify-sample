import cintFetchFeasibilityEstimates from './cint-proxies/cintFetchFeasibilityEstimates';

enum DeliveryTime {
  Day = '1 Day',
  Week = '1 Week',
  Month = '1 Month',
  Never = 'Never'
}

const estimateDeliveryTime = async (limit: number, lengthOfInterview: number): Promise<DeliveryTime> => {
  const weekFeasibility = await cintFetchFeasibilityEstimates(limit, lengthOfInterview, 7);
  if (weekFeasibility < 0.75) {
    const monthFeasibility = await cintFetchFeasibilityEstimates(limit, lengthOfInterview, 30)
    if (monthFeasibility > 0.75) return DeliveryTime.Month
    return DeliveryTime.Never
  }
  const dayFeasibility = await cintFetchFeasibilityEstimates(limit, lengthOfInterview, 1)
  if (dayFeasibility > 0.75) return DeliveryTime.Day
  return DeliveryTime.Week
}

export default estimateDeliveryTime