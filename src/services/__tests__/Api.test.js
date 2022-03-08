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

it.skip('Should upsert a product', async () => {
  const input = {
    barcode: '',
  };
  const { status, product } = await api.upsertProduct(input);
  expect(status).toEqual('success');
  expect(product).toBeDefined();
});

it.skip('Should get a list of products', async () => {
  const { status, products } = await api.getProducts();
  expect(status).toEqual('success');
  expect(products).toBeDefined();
  expect(products.length).toBeGreaterThan(0);
  // eslint-disable-next-line no-restricted-syntax
  for (const product of products) {
    expect(product.id).toBeDefined();
    expect(product.name).toBeDefined();
  }
});

it.skip('Should upsert a custom product', async () => {
  const input = {
    barcode: '000000000',
    name: 'Test product',
    alias: 'Alias product',
    description: 'Random product',
    brand: 'Random brand',
    manufacturer: 'Random manufacturer',
    categoryId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  };
  const { status, product } = await api.upsertCustomProduct(input);
  expect(status).toEqual('success');
  expect(product).toBeDefined();
  expect(product.id).toBeDefined();
});

it.skip('Should add an item to a product', async () => {
  const input = {
    productId: '000000000',
    expirationDate: '',
    quantity: 1,
    cost: 25.5,
  };
  const { status, item } = await api.addItem(input);
  expect(status).toEqual('success');
  expect(item).toBeDefined();
  expect(item.id).toBeDefined();
});

it.skip('Should update a custom product', async () => {
  const input = {
    productId: '000000000',
    barcode: '',
    name: '',
    alias: '',
    description: '',
    brand: '',
    manufacturer: '',
    categoryId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  };
  const { status, product } = await api.addItem(input);
  expect(status).toEqual('success');
  expect(product).toBeDefined();
  expect(product.id).toBeDefined();
});

it.skip('Should get a product by its id', async () => {
  const input = {
    id: '000000000',
  };
  const { status, product } = await api.getProduct(input);
  expect(status).toEqual('success');
  expect(product).toBeDefined();
  expect(product.id).toBeDefined();
});

it.skip('Should delete a product by its id', async () => {
  const input = {
    id: '000000000',
  };
  const { status } = await api.deleteProduct(input);
  expect(status).toEqual('success');
});
