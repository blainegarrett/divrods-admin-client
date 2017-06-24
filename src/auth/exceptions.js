

export class NotAuthorizedException {
  constructor(to = '/login') {
    this.redirectTo = to;
    this.is_auth_exception = true; // TODO: hacky since err instanceOf doesn't work
  }
  cheese() {
    return 'YOLO!!'
  }
  toString() {
    return 'DERPO'
  }
}

export class AccessDeniedException {
  constructor(to = '/403') {
    this.redirectTo = to;
    this.is_auth_exception = true; // TODO: hacky since err instanceOf doesn't work
  }
  toString() {
    return 'DERPO!!'
  }
}