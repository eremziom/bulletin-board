const db = {
  notes: [
    {
      id: 1,
      title: 'sample title 1',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
      pubDate: '14.05.2019',
      actDate: '18.05.2019',
      email: 'example@exam.pl',
      status: 'published',
      photo: 'https://images.pexels.com/photos/3586249/pexels-photo-3586249.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      price: '300$',
      phone: '987 654 321',
      local: 'Warsaw',
    },
    {
      id: 2,
      title: 'title with sampple 2',
      content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      pubDate: '05.09.2019',
      actDate: '29.10.2019',
      email: 'something@email.com',
      status: 'clsoed',
      photo: 'https://images.pexels.com/photos/3597111/pexels-photo-3597111.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      price: '170$',
      phone: '123 456 789',
      local: 'Krakow',
    },
  ],
};

module.exports = db;
