class Mapper<E extends { [key: string]: any }, D extends { [key: string]: any }>
  implements IMapper<E, D>
{
  mapFromDto(dto: D): E {
    const mappedObject: any = {};
    Object.keys(dto).forEach(key => {
      if (dto[key] === null) {
        mappedObject[key] = undefined;
      } else {
        mappedObject[key] = dto[key];
      }
    });
    return mappedObject as E;
  }

  mapToDto(d: E): D {
    const mappedDto: any = {};
    Object.keys(d).forEach(key => {
      if (d[key] === null) {
        mappedDto[key] = undefined;
      } else {
        mappedDto[key] = d[key];
      }
    });
    return mappedDto as D;
  }
}

interface IMapper<E, D> {
  mapFromDto(dto: D): E;
  mapToDto(entity: E): D;
}

export { IMapper, Mapper };
