// event manager application
enum Permission {
  CREATE = 'CREATE',
  DELETE = 'DELETE',
  PUBLISH = 'PUBLISH',
  EDIT = 'EDIT',
  CONTACT = "CONTACT"
}

enum MemberRoles {
  ORGANIZER = 'ORGANIZER',
  CO_ORGANIZER = 'CO_ORGANIZER',
  ASSISTANT_ORGANIZER = 'ASSISTANT_ORGANIZER',
  EVENT_ORGANIZER = 'EVENT_ORGANIZER'
}

abstract class AbstractOrganizer {
  protected permissions: Permission[];

  abstract contactMembers(): void;
  abstract publishEvent(): void;
}

// event manager application
class Organizer extends AbstractOrganizer {

  // organizer get all permissions by default
  constructor() {
    super();
  }

  contactMembers(){};
  publishEvent(){};
}

class CoOrganizer extends AbstractOrganizer {
  constructor(permissions: string[]) {
    super();
  }

  contactMembers(){};
  publishEvent(){};
}

class AssistantOrganizer extends AbstractOrganizer{
  constructor(permissions: string[]) {
    super();
  }

  contactMembers(){};
  publishEvent(){};
}

class EventOrganizer extends AbstractOrganizer{
  constructor(permissions: string[]) {
    super();
  }

  contactMembers() {}
  publishEvent() {}

}


// The factory pattern wraps a constructor for different types 
// of objects and returns instances of the objects via a simple API.
// It makes it easy to create different objects by exposing a simple
// API that return the specified object type.
class OrganizerFactory {
  createOrganizer(): Organizer;
  createOrganizer(options: any): AbstractOrganizer;
  createOrganizer(permissions: string[]) : AbstractOrganizer;
  createOrganizer(role: MemberRoles) : AbstractOrganizer;

  createOrganizer(options?: any): AbstractOrganizer {
    if(!options) return new Organizer();  

    if(typeof options === 'string') {
      switch(options) {
        case MemberRoles.ORGANIZER:
          return new Organizer();
        case MemberRoles.EVENT_ORGANIZER:
          return new EventOrganizer([Permission.PUBLISH, Permission.CONTACT]);
      }
    }
  }
}


const factory  = new OrganizerFactory();
const organizer = factory.createOrganizer(MemberRoles.EVENT_ORGANIZER)



