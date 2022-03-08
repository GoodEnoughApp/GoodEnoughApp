import Api from '../Api';

let api = new Api();
const host = 'https://good-enough-webapp.herokuapp.com';
const token = 'abc';
beforeAll(() => {
  api = new Api(host);
  api.setToken(token);
});

it('Should instantiate the api', () => {
  expect(api.host).toEqual(host);
  expect(api.token).toEqual(token);
});

it.skip('Should register the user', async () => {
  const input = {
    name: 'John Doe',
    email: 'jdoe@test.com',
    password: 'example1234',
  };
  const { status } = await api.signIn(input);
  expect(status).toEqual('success');
});

it.skip('Should verify the use', async () => {
  const input = {
    email: 'jdoe@test.com',
    verificationCode: '000000',
  };
  const { status } = await api.verify(input);
  expect(status).toEqual('success');
});

it.skip('Should login the user', async () => {
  const input = {
    email: 'jdoe@test.com',
    verificationCode: '000000',
  };
  const { status, authToken, expiredAt } = await api.login(input);
  expect(status).toEqual('success');
  expect(authToken).toBeDefined();
  expect(expiredAt).toBeDefined();
});

it.skip('Should get the user information', async () => {
  const { status, userId, name, email, expiredAt } = await api.me();
  expect(status).toEqual('success');
  expect(userId).toBeDefined();
  expect(name).toBeDefined();
  expect(email).toBeDefined();
  expect(expiredAt).toBeDefined();
});

it.skip('Should update user information', async () => {
  const input = {
    name: 'Jane Doe',
    password: 'example1234',
  };
  const { status } = await api.updateMe(input);
  expect(status).toEqual('success');
});

it.skip('Should send a forgot password request', async () => {
  const input = {
    email: 'jdoe@test.com',
  };
  const { status } = await api.forgot(input);
  expect(status).toEqual('success');
});

it.skip('Should get a list of all the categories', async () => {
  const { status, categories } = await api.getCategories();
  expect(status).toEqual('success');
  expect(categories).toBeDefined();
  expect(categories.length).toBeGreaterThan(0);
  // eslint-disable-next-line no-restricted-syntax
  for (const category of categories) {
    expect(category.id).toBeDefined();
    expect(category.name).toBeDefined();
  }
});
