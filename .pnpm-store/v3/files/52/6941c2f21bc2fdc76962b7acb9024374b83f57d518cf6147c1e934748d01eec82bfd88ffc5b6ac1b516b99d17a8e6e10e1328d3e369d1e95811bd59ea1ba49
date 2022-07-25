interface IBaseYamlModel {
    uid: string;
    name: string;
    package?: string;
    summary?: string;
}
export declare type CommonYamlModel = IBaseYamlModel & {
    syntax?: ISyntax;
    fullName?: string;
    isPreview?: boolean;
    isDeprecated?: boolean;
    remarks?: string;
    example?: string[];
    customDeprecatedMessage?: string;
};
export declare type PackageYamlModel = CommonYamlModel & {
    classes?: Array<string>;
    interfaces?: Array<string>;
    enums?: Array<string>;
    typeAliases?: Array<string>;
    properties?: Array<FunctionYamlModel>;
    type?: 'package' | 'module';
    functions?: Array<FunctionYamlModel>;
};
export declare type FunctionYamlModel = CommonYamlModel;
export declare type TypeAliasYamlModel = CommonYamlModel & {
    syntax: string;
};
export declare type TypeYamlModel = CommonYamlModel & {
    constructors?: Array<FunctionYamlModel>;
    properties?: Array<FunctionYamlModel>;
    methods?: Array<FunctionYamlModel>;
    events?: Array<FunctionYamlModel>;
    type: 'class' | 'interface';
    extends?: IType | string;
};
export declare type EnumYamlModel = CommonYamlModel & {
    fields: Array<FieldYamlModel>;
};
export declare type FieldYamlModel = IBaseYamlModel & {
    numericValue?: number;
    value?: string;
};
export interface ISyntax {
    parameters?: Array<IYamlParameter>;
    content?: string;
    return?: IReturn;
}
export interface IYamlParameter {
    id: string;
    type: IType | string;
    description?: string;
}
interface IReturn {
    type: IType | string;
    description?: string;
}
export interface IType {
    typeName?: string;
    typeId?: number;
    reflectedType?: IReflectedType;
    genericType?: IGenericType;
    intersectionType?: IIntersectionType;
    unionType?: IUnionType;
    arrayType?: IType | string;
}
export interface IUnionType {
    types: Types;
}
export interface IIntersectionType {
    types: Types;
}
export interface IGenericType {
    outter: IType | string;
    inner: Types;
}
export interface IReflectedType {
    key: IType | string;
    value: IType | string;
}
export interface IException {
    type: string;
    description: string;
}
declare type Types = IType[] | string[];
export {};
//# sourceMappingURL=ISDPYamlFile.d.ts.map