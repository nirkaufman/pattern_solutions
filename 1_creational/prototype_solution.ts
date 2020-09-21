// by default the clone clone everything
abstract class Prototype {
  clone(): this {
    const cloned = Object.create(Prototype.prototype || null);
    Object.assign(cloned, this);
    return cloned;
  }
}

class User extends Prototype {
  userName: string;
  email: string;

  constructor(userName: string, email: string) {
    super();
    this.userName = userName;
    this.email = email;
  }
}

class Admin  {
  password: string;

  constructor(user:Prototype, password: string) {
    Object.assign(this, user.clone());
    this.password = password;
  }
}

const nir = new User('NirKaufman', 'nir@500tech.com');

const admin = new Admin(nir, 'admin')

console.log(admin.userName)

