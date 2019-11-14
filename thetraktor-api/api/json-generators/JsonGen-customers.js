[
  '{{repeat(150, 170)}}',
  {
    user_id: '{{guid()}}',
    index: '{{index()}}',
    isActive: '{{bool()}}',
    name: {
      first: '{{firstName()}}',
      last: '{{surname()}}'
    },
    gender: '{{gender()}}',
    picture: function (tags) {
      if (this.gender == "male")
        return ('https://randomuser.me/api/portraits/med/men/' + tags.integer(0, 99) + '.jpg');
      if (this.gender == "female")
        return 'https://randomuser.me/api/portraits/med/women/' + tags.integer(0, 99) + '.jpg';
    },
    birth: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',
    email: '{{email()}}',
    phone: '+1 {{phone()}}',
    address: '{{city()}}',
    password: '{{objectId()}}',
    weight: '{{floating(50.01, 120)}}',
    height: '{{floating(150.01, 220)}}',
    registered: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',
    box: 'Crossfit',
    plan: function (tags) {
      var plans = ['5dc0b7a4b73fc84c308441f2', '5dc0b787b73fc84c308441f1', '5dc0b771b73fc84c308441f0', '5dc0b75eb73fc84c308441ef', '5dc0b64063d6814c30992aa5'];
      return plans[tags.integer(0, plans.length - 1)];
    },
    packs: ['{{repeat(1,3)}}', function (tags) {
      var fruits = ['5dc0b2f063d6814c30992aa3', '5dc0b37db73fc84c308441e8', '5dc0b39cb73fc84c308441e9', '5dc0b3b3b73fc84c308441ea', '5dc0b3d3b73fc84c308441eb', '5dc0b400b73fc84c308441ed', '5dc0b3eeb73fc84c308441ec', '5dc0b416b73fc84c308441ee'];
      return fruits[tags.integer(0, fruits.length - 1)];
    }]
  }
]