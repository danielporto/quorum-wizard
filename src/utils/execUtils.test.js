import { execSync } from 'child_process'
import {
  getJavaVersion,
  runJavaVersionLookup,
} from './execUtils'

jest.mock('child_process')

describe('Gets java versions', () => {
  it('parses java 1.8 correctly', () => {
    execSync.mockReturnValueOnce('1.8')
    expect(runJavaVersionLookup()).toEqual(8)
  })
  it('parses java 11.x correctly', () => {
    execSync.mockReturnValueOnce('11.8')
    expect(runJavaVersionLookup()).toEqual(11)
  })
  it('parses java 13.x correctly', () => {
    execSync.mockReturnValueOnce('13.0')
    expect(runJavaVersionLookup()).toEqual(13)
  })
  it('caches getJavaVersion', () => {
    execSync.mockReturnValueOnce('1.8')
    expect(getJavaVersion()).toEqual(8)
    execSync.mockReturnValueOnce('fail')
    expect(getJavaVersion()).toEqual(8)
  })
})
