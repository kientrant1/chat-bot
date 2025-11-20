import { QuestionBank } from '@/types/quiz'

// ------- Question Bank (80 Qs, EN, 2020 Scrum Guide aligned) -------
export const SCRUM_MASTER_BANK: QuestionBank[] = [
  // Scrum Theory & Values
  {
    id: 1,
    tag: 'Theory',
    text: 'Which pillars uphold empirical process control?',
    options: [
      { id: 'a', text: 'Transparency, Inspection, Adaptation' },
      { id: 'b', text: 'Courage, Focus, Openness' },
      { id: 'c', text: 'Plan, Do, Check' },
      { id: 'd', text: 'Definition, Measurement, Control' },
    ],
    correct: ['a'],
    explanation:
      'Empiricism in Scrum is built on Transparency, Inspection, and Adaptation.',
  },
  {
    id: 2,
    tag: 'Values',
    text: 'Which are Scrum Values?',
    options: [
      { id: 'a', text: 'Respect, Openness, Focus, Commitment, Courage' },
      { id: 'b', text: 'Honesty, Integrity, Passion' },
      { id: 'c', text: 'Autonomy, Mastery, Purpose' },
      { id: 'd', text: 'Speed, Quality, Cost' },
    ],
    correct: ['a'],
    explanation:
      'Scrum values are Commitment, Focus, Openness, Respect, and Courage.',
  },
  {
    id: 3,
    tag: 'Theory',
    text: 'Scrum is founded on which process control theory?',
    options: [
      { id: 'a', text: 'Predictive' },
      { id: 'b', text: 'Defined' },
      { id: 'c', text: 'Empirical' },
      { id: 'd', text: 'Iterative' },
    ],
    correct: ['c'],
    explanation:
      'Scrum is founded on empirical process control theory, or empiricism.',
  },
  {
    id: 4,
    tag: 'Roles',
    text: 'Who is accountable for maximizing the value of the product?',
    options: [
      { id: 'a', text: 'Scrum Master' },
      { id: 'b', text: 'Product Owner' },
      { id: 'c', text: 'Developers' },
      { id: 'd', text: 'Stakeholders' },
    ],
    correct: ['b'],
    explanation:
      'The Product Owner is accountable for maximizing the value of the product.',
  },
  {
    id: 5,
    tag: 'Roles',
    text: 'Who is responsible for all product backlog management activities?',
    options: [
      { id: 'a', text: 'Scrum Master' },
      { id: 'b', text: 'Product Owner' },
      { id: 'c', text: 'Developers' },
      { id: 'd', text: 'The whole Scrum Team' },
    ],
    correct: ['b'],
    explanation:
      'The Product Owner is responsible for effective Product Backlog management.',
  },
  {
    id: 6,
    tag: 'Roles',
    text: 'Who is accountable for creating a valuable, useful Increment every Sprint?',
    options: [
      { id: 'a', text: 'Scrum Master' },
      { id: 'b', text: 'Product Owner' },
      { id: 'c', text: 'Developers' },
      { id: 'd', text: 'Stakeholders' },
    ],
    correct: ['c'],
    explanation:
      'Developers are accountable for creating a plan for the Sprint, the Sprint Backlog; instilling quality; adapting their plan each day; and working toward the Sprint Goal.',
  },
  {
    id: 7,
    tag: 'Roles',
    text: 'The Scrum Master serves the Scrum Team by doing what?',
    options: [
      { id: 'a', text: 'Facilitating stakeholder collaboration' },
      { id: 'b', text: 'Coaching team members in self-management' },
      { id: 'c', text: 'Removing impediments' },
      { id: 'd', text: 'All of the above' },
    ],
    correct: ['d'],
    explanation:
      'The Scrum Master serves the Scrum Team in several ways including coaching, facilitating, and removing impediments.',
  },
  {
    id: 8,
    tag: 'Events',
    text: 'What is the timebox for the Sprint Planning event?',
    options: [
      { id: 'a', text: '4 hours for a 2-week Sprint' },
      { id: 'b', text: '8 hours for a 1-month Sprint' },
      { id: 'c', text: 'As long as needed' },
      { id: 'd', text: 'Both A and B' },
    ],
    correct: ['d'],
    explanation:
      'Sprint Planning is timeboxed to a maximum of 8 hours for a one-month Sprint. For shorter Sprints, the event is usually shorter.',
  },
  {
    id: 9,
    tag: 'Events',
    text: 'The purpose of the Daily Scrum is to:',
    options: [
      { id: 'a', text: 'Update the Scrum Master on progress' },
      { id: 'b', text: 'Inspect progress toward the Sprint Goal' },
      { id: 'c', text: 'Create a detailed plan for the next 24 hours' },
      { id: 'd', text: 'Both B and C' },
    ],
    correct: ['d'],
    explanation:
      'The Daily Scrum is to inspect progress toward the Sprint Goal and adapt the Sprint Backlog as necessary.',
  },
  {
    id: 10,
    tag: 'Events',
    text: 'What is the maximum duration of the Daily Scrum?',
    options: [
      { id: 'a', text: '15 minutes' },
      { id: 'b', text: '30 minutes' },
      { id: 'c', text: '1 hour' },
      { id: 'd', text: 'As long as needed' },
    ],
    correct: ['a'],
    explanation:
      'The Daily Scrum is a 15-minute event for the Developers of the Scrum Team.',
  },
  {
    id: 11,
    tag: 'Events',
    text: 'The Sprint Review is an opportunity to:',
    options: [
      { id: 'a', text: 'Inspect the outcome of the Sprint' },
      { id: 'b', text: 'Adapt the Product Backlog if needed' },
      { id: 'c', text: 'Get feedback from stakeholders' },
      { id: 'd', text: 'All of the above' },
    ],
    correct: ['d'],
    explanation:
      'The Sprint Review is held to inspect the outcome of the Sprint and determine future adaptations.',
  },
  {
    id: 12,
    tag: 'Events',
    text: 'What is the timebox for the Sprint Retrospective?',
    options: [
      { id: 'a', text: '1 hour for a 2-week Sprint' },
      { id: 'b', text: '3 hours for a 1-month Sprint' },
      { id: 'c', text: 'As long as needed' },
      { id: 'd', text: 'Both A and B' },
    ],
    correct: ['d'],
    explanation:
      'The Sprint Retrospective is timeboxed to a maximum of 3 hours for a one-month Sprint. For shorter Sprints, the event is usually shorter.',
  },
  {
    id: 13,
    tag: 'Artifacts',
    text: 'What are the three Scrum Artifacts?',
    options: [
      { id: 'a', text: 'Product Backlog, Sprint Backlog, Increment' },
      { id: 'b', text: 'Product Vision, Sprint Plan, Release' },
      { id: 'c', text: 'Backlog, Burndown, Velocity' },
      { id: 'd', text: 'Requirements, Design, Code' },
    ],
    correct: ['a'],
    explanation:
      'The Scrum Artifacts are Product Backlog, Sprint Backlog, and Increment.',
  },
  {
    id: 14,
    tag: 'Artifacts',
    text: 'The Product Backlog is ordered by:',
    options: [
      { id: 'a', text: 'Priority set by the Product Owner' },
      { id: 'b', text: 'Business value' },
      { id: 'c', text: 'Risk' },
      { id: 'd', text: 'The Product Owner decides' },
    ],
    correct: ['d'],
    explanation:
      'The Product Owner is responsible for ordering the Product Backlog items.',
  },
  {
    id: 15,
    tag: 'Artifacts',
    text: 'What is the Definition of Done?',
    options: [
      { id: 'a', text: 'A formal description of the state of the Increment' },
      { id: 'b', text: 'When all Sprint Backlog items are complete' },
      { id: 'c', text: 'When the Product Owner accepts the work' },
      { id: 'd', text: 'When all tests pass' },
    ],
    correct: ['a'],
    explanation:
      'The Definition of Done is a formal description of the state of the Increment when it meets the quality measures required for the product.',
  },
  {
    id: 16,
    tag: 'Sprint',
    text: 'What is the maximum length of a Sprint?',
    options: [
      { id: 'a', text: '2 weeks' },
      { id: 'b', text: '1 month' },
      { id: 'c', text: '3 months' },
      { id: 'd', text: 'No maximum' },
    ],
    correct: ['b'],
    explanation:
      'Sprints are the heartbeat of Scrum, and are fixed length events of one month or less.',
  },
  {
    id: 17,
    tag: 'Sprint',
    text: 'During the Sprint, scope may be clarified and renegotiated with:',
    options: [
      { id: 'a', text: 'Stakeholders' },
      { id: 'b', text: 'Product Owner' },
      { id: 'c', text: 'Scrum Master' },
      { id: 'd', text: 'No one, scope is fixed' },
    ],
    correct: ['b'],
    explanation:
      'During the Sprint, scope may be clarified and renegotiated with the Product Owner as more is learned.',
  },
  {
    id: 18,
    tag: 'Sprint',
    text: 'When might a Sprint be cancelled?',
    options: [
      { id: 'a', text: 'When the Sprint Goal becomes obsolete' },
      { id: 'b', text: 'When the Product Owner requests it' },
      { id: 'c', text: 'When stakeholders are unhappy' },
      { id: 'd', text: 'When the team is behind schedule' },
    ],
    correct: ['a'],
    explanation:
      'A Sprint could be cancelled if the Sprint Goal becomes obsolete.',
  },
  {
    id: 19,
    tag: 'Sprint',
    text: 'Who has the authority to cancel a Sprint?',
    options: [
      { id: 'a', text: 'Scrum Master' },
      { id: 'b', text: 'Product Owner' },
      { id: 'c', text: 'Developers' },
      { id: 'd', text: 'Stakeholders' },
    ],
    correct: ['b'],
    explanation:
      'Only the Product Owner has the authority to cancel the Sprint.',
  },
  {
    id: 20,
    tag: 'Sprint',
    text: 'What happens to incomplete work at the end of a Sprint?',
    options: [
      { id: 'a', text: "It's moved to the next Sprint" },
      { id: 'b', text: "It's returned to the Product Backlog" },
      { id: 'c', text: "It's discarded" },
      { id: 'd', text: "It depends on the team's decision" },
    ],
    correct: ['b'],
    explanation:
      'Any incomplete Product Backlog items are re-examined and put back on the Product Backlog.',
  },
  {
    id: 21,
    tag: 'Roles',
    text: 'How many Product Owners should a Scrum Team have?',
    options: [
      { id: 'a', text: '1' },
      { id: 'b', text: '2' },
      { id: 'c', text: 'One per Scrum Team' },
      { id: 'd', text: 'As many as needed' },
    ],
    correct: ['a'],
    explanation: 'The Product Owner is one person, not a committee.',
  },
  {
    id: 22,
    tag: 'Roles',
    text: 'The Scrum Team consists of:',
    options: [
      { id: 'a', text: 'Product Owner, Scrum Master, Developers' },
      { id: 'b', text: 'Product Owner, Project Manager, Team' },
      { id: 'c', text: 'Business Analyst, Developers, Testers' },
      { id: 'd', text: 'Product Manager, Technical Lead, Engineers' },
    ],
    correct: ['a'],
    explanation:
      'The Scrum Team consists of one Scrum Master, one Product Owner, and Developers.',
  },
  {
    id: 23,
    tag: 'Roles',
    text: 'What is the recommended size for a Scrum Team?',
    options: [
      { id: 'a', text: '5-7 people' },
      { id: 'b', text: '10 or fewer' },
      { id: 'c', text: '7-9 people' },
      { id: 'd', text: 'As many as needed' },
    ],
    correct: ['b'],
    explanation:
      'The Scrum Team is small enough to remain nimble and large enough to complete significant work within a Sprint, typically 10 or fewer people.',
  },
  {
    id: 24,
    tag: 'Events',
    text: 'Who should attend the Sprint Retrospective?',
    options: [
      { id: 'a', text: 'Scrum Team only' },
      { id: 'b', text: 'Scrum Team and stakeholders' },
      { id: 'c', text: 'Product Owner and Scrum Master' },
      { id: 'd', text: 'Developers only' },
    ],
    correct: ['a'],
    explanation: 'The Sprint Retrospective is attended by the Scrum Team.',
  },
  {
    id: 25,
    tag: 'Events',
    text: 'The purpose of the Sprint Retrospective is to:',
    options: [
      { id: 'a', text: 'Plan improvements for the next Sprint' },
      { id: 'b', text: 'Inspect how the last Sprint went' },
      { id: 'c', text: 'Create a plan for implementing improvements' },
      { id: 'd', text: 'All of the above' },
    ],
    correct: ['d'],
    explanation:
      'The Sprint Retrospective is an opportunity for the Scrum Team to inspect itself and create a plan for improvements.',
  },
  {
    id: 26,
    tag: 'Artifacts',
    text: 'The Sprint Backlog is created during:',
    options: [
      { id: 'a', text: 'Sprint Planning' },
      { id: 'b', text: 'Product Backlog Refinement' },
      { id: 'c', text: 'Sprint Review' },
      { id: 'd', text: 'Daily Scrum' },
    ],
    correct: ['a'],
    explanation:
      'The Sprint Backlog is composed of the Sprint Goal, the set of Product Backlog items selected for the Sprint, plus an actionable plan for delivering the Increment.',
  },
  {
    id: 27,
    tag: 'Artifacts',
    text: 'Who owns the Sprint Backlog?',
    options: [
      { id: 'a', text: 'Developers' },
      { id: 'b', text: 'Product Owner' },
      { id: 'c', text: 'Scrum Master' },
      { id: 'd', text: 'Scrum Team' },
    ],
    correct: ['a'],
    explanation: 'The Sprint Backlog is owned and managed by the Developers.',
  },
  {
    id: 28,
    tag: 'Artifacts',
    text: 'The Increment must be:',
    options: [
      { id: 'a', text: 'Usable' },
      { id: 'b', text: 'Meet the Definition of Done' },
      { id: 'c', text: 'Potentially releasable' },
      { id: 'd', text: 'All of the above' },
    ],
    correct: ['d'],
    explanation:
      'An Increment is a concrete stepping stone toward the Product Goal and must be usable and meet the Definition of Done.',
  },
  {
    id: 29,
    tag: 'Sprint',
    text: 'The Sprint Goal is created during:',
    options: [
      { id: 'a', text: 'Sprint Planning' },
      { id: 'b', text: 'Daily Scrum' },
      { id: 'c', text: 'Sprint Review' },
      { id: 'd', text: 'Sprint Retrospective' },
    ],
    correct: ['a'],
    explanation:
      'The Sprint Goal is created during Sprint Planning and provides guidance to the Developers.',
  },
  {
    id: 30,
    tag: 'Sprint',
    text: 'The Sprint Goal describes:',
    options: [
      { id: 'a', text: 'The objective for the Sprint' },
      { id: 'b', text: 'Which features will be delivered' },
      { id: 'c', text: 'The technical approach' },
      { id: 'd', text: 'The release date' },
    ],
    correct: ['a'],
    explanation: 'The Sprint Goal is the single objective for the Sprint.',
  },
  {
    id: 31,
    tag: 'Theory',
    text: 'Scrum is based on:',
    options: [
      { id: 'a', text: 'Defined processes' },
      { id: 'b', text: 'Lean thinking' },
      { id: 'c', text: 'Empiricism and lean thinking' },
      { id: 'd', text: 'Agile principles' },
    ],
    correct: ['c'],
    explanation: 'Scrum is founded on empiricism and lean thinking.',
  },
  {
    id: 32,
    tag: 'Values',
    text: 'Which of the following is NOT a Scrum value?',
    options: [
      { id: 'a', text: 'Courage' },
      { id: 'b', text: 'Honesty' },
      { id: 'c', text: 'Respect' },
      { id: 'd', text: 'Focus' },
    ],
    correct: ['b'],
    explanation:
      'The five Scrum values are Commitment, Focus, Openness, Respect, and Courage. Honesty is not explicitly listed.',
  },
  {
    id: 33,
    tag: 'Roles',
    text: "The Product Owner's decisions must be:",
    options: [
      { id: 'a', text: 'Approved by stakeholders' },
      { id: 'b', text: 'Approved by management' },
      { id: 'c', text: 'Visible in the Product Backlog' },
      { id: 'd', text: 'Approved by the Scrum Master' },
    ],
    correct: ['c'],
    explanation:
      "The Product Owner's decisions are visible in the content and ordering of the Product Backlog.",
  },
  {
    id: 34,
    tag: 'Roles',
    text: 'The Developers are structured and empowered to:',
    options: [
      { id: 'a', text: 'Organize and manage their own work' },
      { id: 'b', text: 'Report to the Scrum Master' },
      { id: 'c', text: "Follow the Product Owner's direction" },
      { id: 'd', text: 'Execute the project plan' },
    ],
    correct: ['a'],
    explanation:
      'Developers are structured and empowered by the organization to organize and manage their own work.',
  },
  {
    id: 35,
    tag: 'Roles',
    text: 'The Scrum Master promotes Scrum by:',
    options: [
      { id: 'a', text: 'Helping everyone understand Scrum' },
      { id: 'b', text: 'Teaching Scrum theory and practice' },
      { id: 'c', text: 'Leading the Scrum Team' },
      { id: 'd', text: 'Both A and B' },
    ],
    correct: ['d'],
    explanation:
      'Scrum Masters promote Scrum by helping everyone understand Scrum theory, practices, rules, and values.',
  },
  {
    id: 36,
    tag: 'Events',
    text: 'The Daily Scrum is held at:',
    options: [
      { id: 'a', text: 'The same time and place every day' },
      { id: 'b', text: 'Wherever the team decides' },
      { id: 'c', text: 'In the morning' },
      { id: 'd', text: "At the Scrum Master's discretion" },
    ],
    correct: ['a'],
    explanation:
      'To reduce complexity, the Daily Scrum is held at the same time and place every working day of the Sprint.',
  },
  {
    id: 37,
    tag: 'Events',
    text: 'Who is required to attend the Daily Scrum?',
    options: [
      { id: 'a', text: 'Developers' },
      { id: 'b', text: 'Scrum Team' },
      { id: 'c', text: 'Product Owner and Scrum Master' },
      { id: 'd', text: 'Stakeholders' },
    ],
    correct: ['a'],
    explanation:
      'The Daily Scrum is an event for the Developers. The Scrum Master and Product Owner may attend if they are working on items in the Sprint Backlog.',
  },
  {
    id: 38,
    tag: 'Events',
    text: 'Sprint Planning addresses:',
    options: [
      { id: 'a', text: 'Why is this Sprint valuable?' },
      { id: 'b', text: 'What can be Done this Sprint?' },
      { id: 'c', text: 'How will the chosen work get done?' },
      { id: 'd', text: 'All of the above' },
    ],
    correct: ['d'],
    explanation:
      'Sprint Planning addresses: Why is this Sprint valuable? What can be Done this Sprint? How will the chosen work get done?',
  },
  {
    id: 39,
    tag: 'Events',
    text: 'The Sprint Review is attended by:',
    options: [
      { id: 'a', text: 'Scrum Team only' },
      { id: 'b', text: 'Scrum Team and key stakeholders' },
      { id: 'c', text: 'Product Owner and stakeholders' },
      { id: 'd', text: 'Developers and Scrum Master' },
    ],
    correct: ['b'],
    explanation:
      'The Scrum Team presents the results of their work to key stakeholders and progress toward the Product Goal is discussed.',
  },
  {
    id: 40,
    tag: 'Events',
    text: 'What is the timebox for the Sprint Review?',
    options: [
      { id: 'a', text: '2 hours for a 2-week Sprint' },
      { id: 'b', text: '4 hours for a 1-month Sprint' },
      { id: 'c', text: 'As long as needed' },
      { id: 'd', text: 'Both A and B' },
    ],
    correct: ['d'],
    explanation:
      'Sprint Review is at most a four-hour meeting for one-month Sprints. For shorter Sprints, the event is usually shorter.',
  },
  {
    id: 41,
    tag: 'Artifacts',
    text: 'Product Backlog refinement usually consumes no more than:',
    options: [
      { id: 'a', text: '10% of Developers capacity' },
      { id: 'b', text: '20% of Developers capacity' },
      { id: 'c', text: 'As much as needed' },
      { id: 'd', text: '5% of Developers capacity' },
    ],
    correct: ['a'],
    explanation:
      'Product Backlog refinement usually consumes no more than 10% of the capacity of the Developers.',
  },
  {
    id: 42,
    tag: 'Artifacts',
    text: 'Who is responsible for all product backlog refinement activities?',
    options: [
      { id: 'a', text: 'Scrum Master' },
      { id: 'b', text: 'Product Owner' },
      { id: 'c', text: 'Developers' },
      { id: 'd', text: 'The Developers may do this with the Product Owner' },
    ],
    correct: ['d'],
    explanation:
      'The Developers who will be doing the work are best positioned to refine these items. However, the Product Owner can choose to do this or delegate to the Developers.',
  },
  {
    id: 43,
    tag: 'Artifacts',
    text: 'When should Product Backlog items be refined?',
    options: [
      { id: 'a', text: 'During Sprint Planning' },
      { id: 'b', text: 'During the Sprint' },
      { id: 'c', text: 'Before Sprint Planning' },
      { id: 'd', text: 'Anytime' },
    ],
    correct: ['b'],
    explanation:
      'Product Backlog items that can be Done by the Scrum Team within one Sprint are deemed ready for selection in a Sprint Planning event. They usually acquire this degree of transparency after refining activities during the Sprint.',
  },
  {
    id: 44,
    tag: 'Sprint',
    text: 'Multiple Sprints are required to complete a product. True or False?',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' },
      { id: 'c', text: 'It depends' },
      { id: 'd', text: 'Not specified' },
    ],
    correct: ['a'],
    explanation:
      'Products are typically delivered through multiple Sprints, with each Sprint potentially releasing an Increment.',
  },
  {
    id: 45,
    tag: 'Sprint',
    text: 'A new Sprint starts:',
    options: [
      { id: 'a', text: 'Immediately after the previous Sprint' },
      { id: 'b', text: 'After a planning period' },
      { id: 'c', text: 'When the team is ready' },
      { id: 'd', text: 'After Sprint Retrospective approval' },
    ],
    correct: ['a'],
    explanation:
      'A new Sprint starts immediately after the conclusion of the previous Sprint.',
  },
  {
    id: 46,
    tag: 'Roles',
    text: 'The Product Owner may delegate product backlog management to:',
    options: [
      { id: 'a', text: 'Scrum Master' },
      { id: 'b', text: 'Developers' },
      { id: 'c', text: 'Stakeholders' },
      { id: 'd', text: 'No one, it cannot be delegated' },
    ],
    correct: ['b'],
    explanation:
      'The Product Owner may delegate product backlog management work to others, but remains accountable.',
  },
  {
    id: 47,
    tag: 'Roles',
    text: "The Scrum Master's primary responsibility is to:",
    options: [
      { id: 'a', text: 'Manage the team' },
      { id: 'b', text: 'Establish Scrum as defined in the Scrum Guide' },
      { id: 'c', text: 'Report progress to management' },
      { id: 'd', text: 'Remove impediments' },
    ],
    correct: ['b'],
    explanation:
      'Scrum Masters are accountable for establishing Scrum as defined in the Scrum Guide.',
  },
  {
    id: 48,
    tag: 'Theory',
    text: 'Transparency enables:',
    options: [
      { id: 'a', text: 'Inspection' },
      { id: 'b', text: 'Adaptation' },
      { id: 'c', text: 'Both A and B' },
      { id: 'd', text: 'Control' },
    ],
    correct: ['c'],
    explanation:
      'Transparency enables inspection. Inspection without transparency is misleading and wasteful.',
  },
  {
    id: 49,
    tag: 'Values',
    text: 'The Scrum Team commits to:',
    options: [
      { id: 'a', text: 'Achieving its goals' },
      { id: 'b', text: 'Supporting each other' },
      { id: 'c', text: 'Both A and B' },
      { id: 'd', text: 'Delivering on time' },
    ],
    correct: ['c'],
    explanation:
      'The Scrum Team members have the courage to do the right thing, to work on tough problems, and commit to achieving the goals of the Scrum Team.',
  },
  {
    id: 50,
    tag: 'Events',
    text: 'The outcome of the Sprint Review includes:',
    options: [
      { id: 'a', text: 'A revised Product Backlog' },
      { id: 'b', text: 'Feedback from stakeholders' },
      { id: 'c', text: "Next Sprint's Sprint Backlog" },
      { id: 'd', text: 'Both A and B' },
    ],
    correct: ['d'],
    explanation:
      'The outcome of the Sprint Review is a revised Product Backlog that defines the probable Product Backlog items for the next Sprint.',
  },
  {
    id: 51,
    tag: 'Artifacts',
    text: 'The commitment for the Product Backlog is:',
    options: [
      { id: 'a', text: 'Sprint Goal' },
      { id: 'b', text: 'Product Goal' },
      { id: 'c', text: 'Definition of Done' },
      { id: 'd', text: 'Release Plan' },
    ],
    correct: ['b'],
    explanation: 'The Product Goal is the commitment for the Product Backlog.',
  },
  {
    id: 52,
    tag: 'Artifacts',
    text: 'The commitment for the Sprint Backlog is:',
    options: [
      { id: 'a', text: 'Sprint Goal' },
      { id: 'b', text: 'Product Goal' },
      { id: 'c', text: 'Definition of Done' },
      { id: 'd', text: 'Sprint Plan' },
    ],
    correct: ['a'],
    explanation: 'The Sprint Goal is the commitment for the Sprint Backlog.',
  },
  {
    id: 53,
    tag: 'Artifacts',
    text: 'The commitment for the Increment is:',
    options: [
      { id: 'a', text: 'Sprint Goal' },
      { id: 'b', text: 'Product Goal' },
      { id: 'c', text: 'Definition of Done' },
      { id: 'd', text: 'Quality Standards' },
    ],
    correct: ['c'],
    explanation: 'The Definition of Done is the commitment for the Increment.',
  },
  {
    id: 54,
    tag: 'Sprint',
    text: 'Changes to the Sprint Backlog during the Sprint:',
    options: [
      { id: 'a', text: 'Are not allowed' },
      { id: 'b', text: 'Can be made by Developers' },
      { id: 'c', text: 'Require Product Owner approval' },
      { id: 'd', text: 'Require Scrum Master approval' },
    ],
    correct: ['b'],
    explanation:
      'The Sprint Backlog is updated throughout the Sprint as more is learned, and is wholly owned by the Developers.',
  },
  {
    id: 55,
    tag: 'Roles',
    text: 'The Developers accountability includes:',
    options: [
      { id: 'a', text: 'Creating a plan for the Sprint' },
      { id: 'b', text: 'Instilling quality' },
      { id: 'c', text: 'Adapting their plan each day' },
      { id: 'd', text: 'All of the above' },
    ],
    correct: ['d'],
    explanation:
      'Developers are accountable for creating a plan for the Sprint, instilling quality by adhering to a Definition of Done, and adapting their plan each day toward the Sprint Goal.',
  },
  {
    id: 56,
    tag: 'Events',
    text: 'During Sprint Planning, the Scrum Team also crafts:',
    options: [
      { id: 'a', text: 'Sprint Goal' },
      { id: 'b', text: 'Product Vision' },
      { id: 'c', text: 'Release Plan' },
      { id: 'd', text: 'Project Charter' },
    ],
    correct: ['a'],
    explanation:
      'During Sprint Planning, the Scrum Team also crafts a Sprint Goal.',
  },
  {
    id: 57,
    tag: 'Theory',
    text: 'Inspection enables:',
    options: [
      { id: 'a', text: 'Transparency' },
      { id: 'b', text: 'Adaptation' },
      { id: 'c', text: 'Control' },
      { id: 'd', text: 'Prediction' },
    ],
    correct: ['b'],
    explanation:
      'Inspection enables adaptation. Inspection without adaptation is considered pointless.',
  },
  {
    id: 58,
    tag: 'Values',
    text: 'The Scrum Team and stakeholders agree to be open about:',
    options: [
      { id: 'a', text: 'The work' },
      { id: 'b', text: 'The challenges' },
      { id: 'c', text: 'Both A and B' },
      { id: 'd', text: 'Progress only' },
    ],
    correct: ['c'],
    explanation:
      'The Scrum Team and stakeholders agree to be open about all the work and the challenges.',
  },
  {
    id: 59,
    tag: 'Sprint',
    text: 'The Sprint Goal can be updated during the Sprint:',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' },
      { id: 'c', text: 'Only with Product Owner approval' },
      { id: 'd', text: 'Only during Daily Scrum' },
    ],
    correct: ['b'],
    explanation:
      'The Sprint Goal is created during Sprint Planning and is fixed for the duration of the Sprint.',
  },
  {
    id: 60,
    tag: 'Roles',
    text: 'Who creates the Product Goal?',
    options: [
      { id: 'a', text: 'Product Owner' },
      { id: 'b', text: 'Scrum Team' },
      { id: 'c', text: 'Stakeholders' },
      { id: 'd', text: 'Product Owner with Scrum Team input' },
    ],
    correct: ['d'],
    explanation:
      'The Product Goal describes a future state of the product and is developed and explicitly communicated by the Product Owner.',
  },
  {
    id: 61,
    tag: 'Events',
    text: 'The Sprint Planning event is divided into:',
    options: [
      { id: 'a', text: 'Two topics' },
      { id: 'b', text: 'Three topics' },
      { id: 'c', text: 'Four phases' },
      { id: 'd', text: 'No specific structure' },
    ],
    correct: ['b'],
    explanation:
      'Sprint Planning addresses three topics: Why is this Sprint valuable? What can be Done this Sprint? How will the chosen work get done?',
  },
  {
    id: 62,
    tag: 'Artifacts',
    text: 'The Product Backlog is never complete:',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' },
      { id: 'c', text: 'Depends on the project' },
      { id: 'd', text: 'Only for large projects' },
    ],
    correct: ['a'],
    explanation:
      'The Product Backlog is an emergent, ordered list of what is needed to improve the product. It is never complete.',
  },
  {
    id: 63,
    tag: 'Sprint',
    text: 'Work planned for the first days of the Sprint by the Developers is:',
    options: [
      { id: 'a', text: 'Decomposed by the end of Sprint Planning' },
      { id: 'b', text: 'Decomposed during the Sprint' },
      { id: 'c', text: 'Specified in detail by Product Owner' },
      { id: 'd', text: 'Not decomposed' },
    ],
    correct: ['a'],
    explanation:
      'Work planned for the first days of the Sprint by the Developers is decomposed by the end of this meeting, often to units of one day or less.',
  },
  {
    id: 64,
    tag: 'Roles',
    text: 'The Product Owner is one person, not a committee:',
    options: [
      { id: 'a', text: 'True' },
      { id: 'b', text: 'False' },
      { id: 'c', text: 'Can be a committee in large organizations' },
      { id: 'd', text: 'Depends on company policy' },
    ],
    correct: ['a'],
    explanation: 'The Product Owner is one person, not a committee.',
  },
  {
    id: 65,
    tag: 'Events',
    text: 'The Daily Scrum is held to:',
    options: [
      { id: 'a', text: 'Report status to management' },
      { id: 'b', text: 'Inspect progress toward Sprint Goal' },
      { id: 'c', text: 'Receive assignments from Scrum Master' },
      { id: 'd', text: 'Update the Sprint Backlog' },
    ],
    correct: ['b'],
    explanation:
      'The purpose of the Daily Scrum is to inspect progress toward the Sprint Goal and adapt the Sprint Backlog as necessary.',
  },
  {
    id: 66,
    tag: 'Theory',
    text: 'Scrum employs an iterative, incremental approach to:',
    options: [
      { id: 'a', text: 'Optimize predictability' },
      { id: 'b', text: 'Control risk' },
      { id: 'c', text: 'Both A and B' },
      { id: 'd', text: 'Maximize velocity' },
    ],
    correct: ['c'],
    explanation:
      'Scrum employs an iterative, incremental approach to optimize predictability and to control risk.',
  },
  {
    id: 67,
    tag: 'Values',
    text: 'Successful use of Scrum depends on people becoming more proficient in living these values:',
    options: [
      { id: 'a', text: 'Commitment, Focus, Openness, Respect, Courage' },
      { id: 'b', text: 'Agility, Speed, Quality, Efficiency' },
      { id: 'c', text: 'Transparency, Inspection, Adaptation' },
      { id: 'd', text: 'Planning, Execution, Monitoring, Control' },
    ],
    correct: ['a'],
    explanation:
      'Successful use of Scrum depends on people becoming more proficient in living five values: Commitment, Focus, Openness, Respect, and Courage.',
  },
  {
    id: 68,
    tag: 'Roles',
    text: 'The Scrum Master serves the organization by:',
    options: [
      { id: 'a', text: 'Leading the organization in Scrum adoption' },
      { id: 'b', text: 'Planning Scrum implementations' },
      { id: 'c', text: 'Helping understand empirical product development' },
      { id: 'd', text: 'All of the above' },
    ],
    correct: ['d'],
    explanation:
      'The Scrum Master serves the organization in several ways including leading, planning, and helping understand empirical approaches.',
  },
  {
    id: 69,
    tag: 'Events',
    text: 'Who is responsible for facilitating the Daily Scrum?',
    options: [
      { id: 'a', text: 'Scrum Master' },
      { id: 'b', text: 'Product Owner' },
      { id: 'c', text: 'Developers' },
      { id: 'd', text: 'Any team member' },
    ],
    correct: ['c'],
    explanation:
      'The Developers are responsible for conducting the Daily Scrum.',
  },
  {
    id: 70,
    tag: 'Artifacts',
    text: "If the Definition of Done for an increment is part of the organization's standards:",
    options: [
      { id: 'a', text: 'All Scrum Teams must follow it' },
      { id: 'b', text: 'Teams can choose to follow it' },
      { id: 'c', text: 'Only new teams must follow it' },
      { id: 'd', text: "It's optional" },
    ],
    correct: ['a'],
    explanation:
      'If the Definition of Done for an increment is part of the standards of the organization, all Scrum Teams must follow it as a minimum.',
  },
  {
    id: 71,
    tag: 'Sprint',
    text: 'The Sprint Backlog makes visible all the work that:',
    options: [
      {
        id: 'a',
        text: 'The Developers identify as necessary to meet the Sprint Goal',
      },
      { id: 'b', text: 'The Product Owner wants done' },
      { id: 'c', text: 'Stakeholders requested' },
      { id: 'd', text: 'Management assigned' },
    ],
    correct: ['a'],
    explanation:
      'The Sprint Backlog makes visible all the work that the Developers identify as necessary to meet the Sprint Goal.',
  },
  {
    id: 72,
    tag: 'Roles',
    text: "The Product Owner's decisions are respected:",
    options: [
      { id: 'a', text: 'When approved by management' },
      { id: 'b', text: 'When documented in writing' },
      {
        id: 'c',
        text: 'No one is allowed to tell Developers to work from a different set of requirements',
      },
      { id: 'd', text: 'When communicated to stakeholders' },
    ],
    correct: ['c'],
    explanation:
      "The Product Owner's decisions are visible in the content and ordering of the Product Backlog, and no one is allowed to tell the Developers to work from a different set of requirements.",
  },
  {
    id: 73,
    tag: 'Events',
    text: 'Sprint Retrospective occurs:',
    options: [
      { id: 'a', text: 'Before Sprint Review' },
      { id: 'b', text: 'After Sprint Review' },
      { id: 'c', text: 'During Sprint Review' },
      { id: 'd', text: 'Anytime during Sprint' },
    ],
    correct: ['b'],
    explanation: 'The Sprint Retrospective concludes the Sprint.',
  },
  {
    id: 74,
    tag: 'Theory',
    text: 'Each artifact contains a commitment to ensure it provides information that:',
    options: [
      { id: 'a', text: 'Enhances transparency' },
      { id: 'b', text: 'Provides focus' },
      { id: 'c', text: 'Measures progress' },
      { id: 'd', text: 'All of the above' },
    ],
    correct: ['d'],
    explanation:
      'Each artifact contains a commitment to ensure it provides information that enhances transparency and focus against which progress can be measured.',
  },
  {
    id: 75,
    tag: 'Values',
    text: 'Openness helps the Scrum Team and stakeholders:',
    options: [
      { id: 'a', text: 'Share progress' },
      { id: 'b', text: 'Share learnings' },
      { id: 'c', text: 'Share challenges' },
      { id: 'd', text: 'All of the above' },
    ],
    correct: ['d'],
    explanation:
      'The Scrum Team members are open about the work and the challenges.',
  },
  {
    id: 76,
    tag: 'Sprint',
    text: 'The length of a Sprint should be:',
    options: [
      { id: 'a', text: 'Short enough to keep risk contained' },
      { id: 'b', text: 'Short enough to maintain focus' },
      { id: 'c', text: 'Long enough to complete meaningful work' },
      { id: 'd', text: 'All of the above' },
    ],
    correct: ['d'],
    explanation:
      'Sprints are limited to one calendar month to reduce complexity, risk, and maintain the ability to adapt.',
  },
  {
    id: 77,
    tag: 'Roles',
    text: 'Developers have the authority to:',
    options: [
      { id: 'a', text: 'Change the Sprint Goal' },
      { id: 'b', text: 'Add items to Sprint Backlog' },
      {
        id: 'c',
        text: 'Decide how to turn Product Backlog items into Increments',
      },
      { id: 'd', text: 'All of the above' },
    ],
    correct: ['c'],
    explanation: 'How the work gets done is solely up to the Developers.',
  },
  {
    id: 78,
    tag: 'Events',
    text: 'The Scrum Team discusses during Sprint Retrospective:',
    options: [
      { id: 'a', text: 'What went well' },
      { id: 'b', text: 'What problems were encountered' },
      { id: 'c', text: 'How problems were solved' },
      { id: 'd', text: 'All of the above' },
    ],
    correct: ['d'],
    explanation:
      'The Scrum Team inspects how the last Sprint went with regards to individuals, interactions, processes, tools, and their Definition of Done.',
  },
  {
    id: 79,
    tag: 'Artifacts',
    text: 'The Product Goal is:',
    options: [
      { id: 'a', text: 'Long-term objective for the Scrum Team' },
      { id: 'b', text: 'Included in the Product Backlog' },
      { id: 'c', text: 'A commitment for the Product Backlog' },
      { id: 'd', text: 'All of the above' },
    ],
    correct: ['d'],
    explanation:
      'The Product Goal describes a future state of the product and is the long-term objective for the Scrum Team. It is the commitment for the Product Backlog.',
  },
  {
    id: 80,
    tag: 'Sprint',
    text: 'Scrum Teams deliver products:',
    options: [
      { id: 'a', text: 'Iteratively' },
      { id: 'b', text: 'Incrementally' },
      { id: 'c', text: 'Maximizing opportunities for feedback' },
      { id: 'd', text: 'All of the above' },
    ],
    correct: ['d'],
    explanation:
      'Scrum Teams deliver products iteratively and incrementally, maximizing opportunities for feedback.',
  },
]
