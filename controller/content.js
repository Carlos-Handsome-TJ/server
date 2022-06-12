/**
 *
 */

class ContentController {
  async findContent(ctx) {
    const {user} = ctx.request.body
  }
}

module.exports = new ContentController()