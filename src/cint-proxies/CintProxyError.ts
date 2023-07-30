type ErrorResp = { errors: {field: string, message: string}[]}
const _createMessage = (errorResp: ErrorResp) => errorResp.errors.map(z => `${z.field}: ${z.message}`).join(',')


class CintProxyError extends Error {
  status: number;
  constructor(errorResp: ErrorResp, status) {
    super(_createMessage(errorResp));
    this.status = status
  }
}

export default CintProxyError
