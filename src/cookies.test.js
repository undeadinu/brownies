import cookies from './cookies';

describe('cookies', () => {
  it('is defined', () => {
    expect(cookies).toBeDefined();
  });

  it('can set, read and remove cookies', () => {
    expect(cookies.name).toBe(undefined);
    cookies.name = 'Francisco';
    expect(cookies.name).toBe('Francisco');
    delete cookies.name;
    expect(cookies.name).toBe(undefined);
  });

  it('does work with the underlying engine', () => {
    expect(document.cookie).toBe("");
    cookies.name = 'Francisco';
    const raw = decodeURIComponent(document.cookie);
    expect(raw).toBe('name=' + JSON.stringify('Francisco'));
    delete cookies.name;
    expect(document.cookie).toBe("");
  });

  it('can list the cookies', () => {
    cookies.firstname = 'Francisco';
    cookies.lastname = 'Presencia';
    expect(Object.keys(cookies)).toEqual(['firstname', 'lastname']);
    expect(Object.values(cookies)).toEqual(['Francisco', 'Presencia']);
    expect(Object.entries(cookies)).toEqual([['firstname', 'Francisco'], ['lastname', 'Presencia']]);
    delete cookies.firstname;
    delete cookies.lastname;
  });

  it('can iterate with "in"', () => {
    cookies.firstname = 'Francisco';
    cookies.lastname = 'Presencia';
    const keys = [];
    for (let key in cookies) {
      keys.push(key);
    }
    expect(Object.keys(cookies)).toEqual(['firstname', 'lastname']);
    delete cookies.firstname;
    delete cookies.lastname;
  });

  it('throws for the iteration since it is not yet ready', () => {
    cookies.firstname = 'Francisco';
    cookies.lastname = 'Presencia';
    const values = [];
    for (let val of cookies) {
      values.push(val);
    }
    expect(values).toEqual(['Francisco', 'Presencia']);
  });

  it('retains the types', () => {
    cookies.id = 1;
    cookies.accepted = true;
    cookies.name = 'Francisco';
    cookies.friends = [3, 5];
    cookies.user = { id: 1, accepted: true, name: 'Francisco' };
    expect(typeof cookies.id).toEqual('number');
    expect(typeof cookies.accepted).toEqual('boolean');
    expect(typeof cookies.name).toEqual('string');
    expect(Array.isArray(cookies.friends)).toEqual(true);
    expect(typeof cookies.user).toEqual('object');
    for (let key in cookies) {
      delete cookies[key];
    }
  });
});
