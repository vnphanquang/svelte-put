export interface BaseOption<Value> {
  label: string;
  value: Value;
  id: string;
  disabled?: boolean;
  group?: string;
  deselectable?: boolean;
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

export interface SelectProps<
  O extends BaseOption<V>,
  M extends true | false | undefined,
  V = O['value'],
> {
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
  multiple?: M;
  selected?: undefined extends M ? O : true extends M ? O[] : O;
  // selected?: M extends undefined ? O : M extends true ? O[] : O;
  value?: undefined extends M ? V : true extends M ? V[] : V;
}
