export interface BaseOption<Value> {
  label: string;
  value: Value;
  id: string;
  disabled?: boolean;
  group?: string;
}

export interface SearchInput<Option> {
  query: string;
  options: Option[];
}

export type Searcher<Option> = (input: SearchInput<Option>) => Option[] | Promise<Option[]>;

export interface SearchConfig<Option> {
  enabled: boolean;
  search: Searcher<Option>;
  debounced: false | number;
  clearOnSelection: boolean;
}

export type SearchProp<Option> = boolean | Searcher<Option> | Partial<SearchConfig<Option>>;

export type Grouper<Option> = (option: Option) => string;

export interface GroupConfig<Option> {
  enabled: boolean;
  group: Grouper<Option>;
  ungroupedLabel: string;
}

export type GroupProp<Option> = boolean | Grouper<Option> | Partial<GroupConfig<Option>>;

export interface SelectBaseProps<O extends BaseOption<V>, V = O['value']> {
  id?: string;
  placeholder?: string;
  open?: boolean;
  disabled?: boolean;
  collapseOnSelection?: boolean;
  required?: boolean;
  nullable?: boolean;
  group?: GroupProp<O>;
  generateUlId?: () => string;
  generateLiId?: (option: O) => string;
  search?: SearchProp<O>;
  class?: string;
  clearable?: boolean;
  hideExpansionIndicator?: boolean;
  options: O[];
}

export interface SingleSelectProps<O extends BaseOption<V>, V = O['value']> extends SelectBaseProps<O, V> {
  multiple?: false;
  selected?: O;
  value?: V;
}

export interface MultipleSelectProps<O extends BaseOption<V>, V = O['value']> extends SelectBaseProps<O, V> {
  multiple: true;
  selected?: O[];
  value?: V[];
}

export type SelectProps<O extends BaseOption<V>, V = O['value']> =
  | SingleSelectProps<O, V>
  | MultipleSelectProps<O, V>;
