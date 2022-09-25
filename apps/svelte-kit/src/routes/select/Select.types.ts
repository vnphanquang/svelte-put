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

export interface SelectProps<
  Value,
  Option extends BaseOption<Value>,
  Multiple extends true | false,
> {
  id?: string;
  placeholder?: string;
  open?: boolean;
  disabled?: boolean;
  multiple?: Multiple;
  collapseOnSelection?: boolean;
  required?: boolean;
  nullable?: boolean;
  options: Option[];
  group?: GroupProp<Option>;
  selected?: Multiple extends true ? Option[] : Option;
  value?: Multiple extends true ? Option['value'][] : Option['value'];
  generateUlId?: () => string;
  generateLiId?: (option: Option) => string;
  search?: SearchProp<Option>;
  class?: string;
  clearable?: boolean;
  hideExpansionIndicator?: boolean;
}
