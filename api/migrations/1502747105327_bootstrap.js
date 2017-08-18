exports.up = (pgm) => {
  // bootstrap base databases
  pgm.createTable('brigade', brigadeSchema())
  pgm.createTable('settings', settingsSchema())
  pgm.createTable('projects', projectsSchema())
  pgm.createTable('users', usersSchema())
  pgm.createTable('keywords', keywordsSchema())
  pgm.createTable('needs', needsSchema())
  pgm.createTable('events', eventsSchema())
  pgm.createTable('posts', postsSchema())

  // bootstrap relational databases
  pgm.createTable('projectsUsers', projectsUsersSchema())
  pgm.createTable('projectsKeywords', projectsKeywordsSchema())
  pgm.createTable('projectsNeeds', projectsNeedsSchema())
  pgm.createTable('githubActivities', githubActivitiesSchema())
  pgm.createTable('eventsUsers', eventsUsersSchema()) // checkins
  pgm.createTable('brigadeUsers', brigadeUsersSchema()) // admins
};

exports.down = (pgm) => {

};


function projectsSchema() {
  return {
    // identity definition
    id: {
      type: 'string',
      unique: true,
      primaryKey: true,
      notNull: true
    },
    name: { type: 'string' }, // Display title
    description: { type: 'string' },
    thumbnailUrl: { type: 'string' },
    bannerUrl: { type: 'string' },
    fork: { type: 'boolean' },
    forkId: { type: 'string' },
    forkBrigade: { type: 'string' },
    license: { type: 'string' },
    homepage: { type: 'string' },
    repositories: { type: 'jsonb'},
    partners: { type: 'jsonb' }, // name, email, logo?
    links: { type: 'jsonb' }, // simple strings
    videos: { type: 'jsonb' }, // youtube links or ids
    published: { type: 'boolean' },

    // state definition
    active: { type: 'boolean' },
    status: { type: 'string' }, // civic.json + civic.dc.json - proposed, ideation, alpha, beta, production, archival
    lastUpdated: { type: 'datetime' },
    lastCheckedFromGithub: { type: 'datetime' },

    // settings definition
    checkFromGithub: { type: 'boolean' }
    checkFromGithubAs: { type: 'string' }
  }
}

function projectsUsersSchema() {
  return {
    user: { type: 'string', references: 'users' },
    type: { type: 'string' }, // lead || member
    project: { type: 'string', references: 'projects' },
  }
}

function projectsKeywordsSchema() {
  return {
    keyword: { type: 'string', references: 'keywords' },
    project: { type: 'string', references: 'projects' },
  }
}

function projectsNeedsSchema() {
  return {
    need: { type: 'string', references: 'keywords' },
    project: { type: 'string', references: 'projects' },
  }
}

function githubActivitiesSchema() {
  return {
    repo: { type: 'string' },
    project: { type: 'string', references: 'projects' },
    type: { type: 'string' },
    url: { type: 'string' },
    date: { type: 'datetime' },
    message: { type: 'string' },
    commenter: { type: 'jsonb' },
    committer: { type: 'jsonb' }
  }
}

// users
// keywords
// needs
