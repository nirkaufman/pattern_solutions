// classic singleton
class Singleton {
  private static instance: Singleton;

  // hence the private constructor
  private constructor() {}

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }

    return Singleton.instance;
  }
}

