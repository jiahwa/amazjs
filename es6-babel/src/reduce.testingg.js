this.modes = this.plugins.reduce((modes, { apply: { defaultModes }}) => {
    return Object.assign(modes, defaultModes)
  }, {})