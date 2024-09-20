import { InvalidParameterException } from '@domain/shared/exceptions';
import { EnumValueObject } from '@domain/shared/value-object/enum-value-object';

enum ScopeNames {
    COMMENTER = 'commenter',
    LIKER = 'liker',
}

class ScopeName extends EnumValueObject<ScopeNames> {
    constructor(value: ScopeNames) {
        super(value, Object.values(ScopeNames));
    }

    public static fromValue(value: string): ScopeName {
        switch (value) {
            case ScopeNames.COMMENTER: {
                return new ScopeName(ScopeNames.COMMENTER);
            }
            case ScopeNames.LIKER: {
                return new ScopeName(ScopeNames.LIKER);
            }
            default: {
                throw new InvalidParameterException(`The role ${value} is invalid`);
            }
        }
    }

    protected throwErrorForInvalidValue(value: ScopeNames): void {
        throw new InvalidParameterException(`The role ${value} is invalid`);
    }
}

export { ScopeName, ScopeNames };
