class Neo4jPerson {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  static FromJSON(...jsonPersons) {
    let persons = [];
    jsonPersons.forEach((person) => {
      let name = Neo4jPerson._transformPersonName(person.name);
      persons.push(new Neo4jPerson(person.id, name));
    });

    if (persons.length === 1) {
      return persons[0];
    }
    return persons;
  }

  static _transformPersonName(name) {
    let finalName = [];
    let names = name.split(" ");

    names.forEach((name, i) => {
      if (i != 0 && i != names.length - 1) {
        name = name[0];
      }
      finalName.push(name);
    });

    return finalName.join(" ");
  }
}

module.exports = Neo4jPerson;
