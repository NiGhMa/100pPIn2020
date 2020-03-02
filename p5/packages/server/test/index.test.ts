import { getAppName } from '../src/index'

test('outputs correct string', () => {
  expect(getAppName()).toBe('my-project-boilerplate')
})
