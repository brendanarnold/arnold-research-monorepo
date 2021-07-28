export class SemanticVersion {
  public major: number
  public minor: number | undefined
  public patch: number | undefined

  constructor(str: string) {
    const [major, minor, patch] = str.split('.')
    this.major = parseInt(major)
    this.minor = parseInt(minor)
    this.patch = parseInt(patch)
  }

  isCompatibleWith(semVer: string): boolean {
    return this.major === new SemanticVersion(semVer).major
  }
}

export const semanticVersion = (semVer: string): SemanticVersion => {
  return new SemanticVersion(semVer)
}
