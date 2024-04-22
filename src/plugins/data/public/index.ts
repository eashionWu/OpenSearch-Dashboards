/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Any modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { PluginInitializerContext } from '../../../core/public';
import { ConfigSchema } from '../config';

/*
 * Filters:
 */

import {
  buildEmptyFilter,
  buildExistsFilter,
  buildPhraseFilter,
  buildPhrasesFilter,
  buildQueryFilter,
  buildRangeFilter,
  disableFilter,
  FILTERS,
  FilterStateStore,
  getDisplayValueFromFilter,
  getPhraseFilterField,
  getPhraseFilterValue,
  isExistsFilter,
  isFilterPinned,
  isMatchAllFilter,
  isMissingFilter,
  isPhraseFilter,
  isPhrasesFilter,
  isQueryStringFilter,
  isRangeFilter,
  toggleFilterNegated,
  compareFilters,
  COMPARE_ALL_OPTIONS,
} from '../common';

import { FilterLabel } from './ui';

import {
  generateFilters,
  onlyDisabledFiltersChanged,
  changeTimeFilter,
  mapAndFlattenFilters,
  extractTimeFilter,
  extractTimeRange,
  convertRangeFilterToTimeRangeString,
} from './query';

// Filter helpers namespace:
export const opensearchFilters = {
  FilterLabel,

  FILTERS,
  FilterStateStore,

  buildEmptyFilter,
  buildPhrasesFilter,
  buildExistsFilter,
  buildPhraseFilter,
  buildQueryFilter,
  buildRangeFilter,

  isPhraseFilter,
  isExistsFilter,
  isPhrasesFilter,
  isRangeFilter,
  isMatchAllFilter,
  isMissingFilter,
  isQueryStringFilter,
  isFilterPinned,

  toggleFilterNegated,
  disableFilter,
  getPhraseFilterField,
  getPhraseFilterValue,
  getDisplayValueFromFilter,

  compareFilters,
  COMPARE_ALL_OPTIONS,
  generateFilters,
  onlyDisabledFiltersChanged,

  changeTimeFilter,
  convertRangeFilterToTimeRangeString,
  mapAndFlattenFilters,
  extractTimeFilter,
  extractTimeRange,
};

export {
  RangeFilter,
  RangeFilterMeta,
  RangeFilterParams,
  ExistsFilter,
  PhrasesFilter,
  PhraseFilter,
  CustomFilter,
  MatchAllFilter,
} from '../common';

/*
 * opensearchQuery and opensearchKuery:
 */

import {
  fromKueryExpression,
  toOpenSearchQuery,
  nodeTypes,
  buildOpenSearchQuery,
  getOpenSearchQueryConfig,
  buildQueryFromFilters,
  luceneStringToDsl,
  decorateQuery,
} from '../common';

export const opensearchKuery = {
  nodeTypes,
  fromKueryExpression,
  toOpenSearchQuery,
};

export const opensearchQuery = {
  buildOpenSearchQuery,
  getOpenSearchQueryConfig,
  buildQueryFromFilters,
  luceneStringToDsl,
  decorateQuery,
};

export { OpenSearchQueryConfig, KueryNode } from '../common';

/*
 * Field Formatters:
 */

import {
  FieldFormat,
  FieldFormatsRegistry,
  DEFAULT_CONVERTER_COLOR,
  HTML_CONTEXT_TYPE,
  TEXT_CONTEXT_TYPE,
  FIELD_FORMAT_IDS,
  BoolFormat,
  BytesFormat,
  ColorFormat,
  DurationFormat,
  IpFormat,
  NumberFormat,
  PercentFormat,
  RelativeDateFormat,
  SourceFormat,
  StaticLookupFormat,
  UrlFormat,
  StringFormat,
  TruncateFormat,
} from '../common/field_formats';

import { DateNanosFormat, DateFormat } from './field_formats';
export { baseFormattersPublic, FieldFormatsStart } from './field_formats';

// Field formats helpers namespace:
export const fieldFormats = {
  FieldFormat,
  FieldFormatsRegistry, // exported only for tests. Consider mock.

  DEFAULT_CONVERTER_COLOR,
  HTML_CONTEXT_TYPE,
  TEXT_CONTEXT_TYPE,
  FIELD_FORMAT_IDS,

  BoolFormat,
  BytesFormat,
  ColorFormat,
  DateFormat,
  DateNanosFormat,
  DurationFormat,
  IpFormat,
  NumberFormat,
  PercentFormat,
  RelativeDateFormat,
  SourceFormat,
  StaticLookupFormat,
  UrlFormat,
  StringFormat,
  TruncateFormat,
};

export {
  IFieldFormat,
  FieldFormatInstanceType,
  IFieldFormatsRegistry,
  FieldFormatsContentType,
  FieldFormatsGetConfigFn,
  FieldFormatConfig,
  FieldFormatId,
  FieldFormat,
} from '../common';

/*
 * Index patterns:
 */

import { isNestedField, isFilterable } from '../common';

import {
  ILLEGAL_CHARACTERS_KEY,
  CONTAINS_SPACES_KEY,
  ILLEGAL_CHARACTERS_VISIBLE,
  ILLEGAL_CHARACTERS,
  isDefault,
  validateIndexPattern,
  getFromSavedObject,
  flattenHitWrapper,
  formatHitProvider,
} from './index_patterns';

export type { IndexPatternsService } from './index_patterns';

// Index patterns namespace:
export const indexPatterns = {
  ILLEGAL_CHARACTERS_KEY,
  CONTAINS_SPACES_KEY,
  ILLEGAL_CHARACTERS_VISIBLE,
  ILLEGAL_CHARACTERS,
  isDefault,
  isFilterable,
  isNestedField,
  validate: validateIndexPattern,
  getFromSavedObject,
  flattenHitWrapper,
  formatHitProvider,
};

export {
  IndexPatternsContract,
  IndexPattern,
  IIndexPatternFieldList,
  IndexPatternField,
} from './index_patterns';

export {
  IIndexPattern,
  IFieldType,
  IFieldSubType,
  OPENSEARCH_FIELD_TYPES,
  OSD_FIELD_TYPES,
  IndexPatternAttributes,
  UI_SETTINGS,
  TypeMeta as IndexPatternTypeMeta,
  AggregationRestrictions as IndexPatternAggRestrictions,
  IndexPatternSpec,
  fieldList,
} from '../common';

export { DuplicateIndexPatternError } from '../common/index_patterns/errors';

/*
 * Autocomplete query suggestions:
 */

export {
  QuerySuggestion,
  QuerySuggestionTypes,
  QuerySuggestionGetFn,
  QuerySuggestionGetFnArgs,
  QuerySuggestionBasic,
  QuerySuggestionField,
  AutocompleteStart,
} from './autocomplete';

/*
 * Search:
 */

import {
  // aggs
  CidrMask,
  intervalOptions,
  isDateHistogramBucketAggConfig,
  isNumberType,
  isStringType,
  isType,
  parentPipelineType,
  propFilter,
  siblingPipelineType,
  termsAggFilter,
  dateHistogramInterval,
  InvalidOpenSearchCalendarIntervalError,
  InvalidOpenSearchIntervalFormatError,
  Ipv4Address,
  isValidOpenSearchInterval,
  isValidInterval,
  parseOpenSearchInterval,
  parseInterval,
  toAbsoluteDates,
  // expressions utils
  getRequestInspectorStats,
  getResponseInspectorStats,
  // tabify
  tabifyAggResponse,
  tabifyGetColumns,
} from '../common';

export {
  // aggs
  AggConfigSerialized,
  AggGroupLabels,
  AggGroupName,
  AggGroupNames,
  AggParam,
  AggParamOption,
  AggParamType,
  AggConfigOptions,
  BUCKET_TYPES,
  OpenSearchaggsExpressionFunctionDefinition,
  IAggConfig,
  IAggConfigs,
  IAggType,
  IFieldParamType,
  IMetricAggType,
  METRIC_TYPES,
  OptionedParamType,
  OptionedValueProp,
  ParsedInterval,
  // tabify
  TabbedAggColumn,
  TabbedAggRow,
  TabbedTable,
} from '../common';

export type { AggConfigs, AggConfig } from '../common';

export {
  // search
  OPENSEARCH_SEARCH_STRATEGY,
  OpenSearchQuerySortValue,
  extractSearchSourceReferences,
  getOpenSearchPreference,
  getSearchParamsFromRequest,
  IOpenSearchSearchRequest,
  IOpenSearchSearchResponse,
  IOpenSearchDashboardsSearchRequest,
  IOpenSearchDashboardsSearchResponse,
  injectSearchSourceReferences,
  ISearch,
  ISearchSetup,
  ISearchStart,
  ISearchStartSearchSource,
  ISearchGeneric,
  ISearchSource,
  parseSearchSourceJSON,
  SearchInterceptor,
  SearchInterceptorDeps,
  SearchRequest,
  SearchSourceFields,
  SortDirection,
  // expression functions and types
  OpenSearchdslExpressionFunctionDefinition,
  OpenSearchRawResponseExpressionTypeDefinition,
  // errors
  SearchError,
  SearchTimeoutError,
  PainlessError,
} from './search';

export type { SearchSource } from './search';

export { ISearchOptions, isErrorResponse, isCompleteResponse, isPartialResponse } from '../common';

// Search namespace
export const search = {
  aggs: {
    CidrMask,
    dateHistogramInterval,
    intervalOptions,
    InvalidOpenSearchCalendarIntervalError,
    InvalidOpenSearchIntervalFormatError,
    Ipv4Address,
    isDateHistogramBucketAggConfig, // TODO: remove in build_pipeline refactor
    isNumberType,
    isStringType,
    isType,
    isValidOpenSearchInterval,
    isValidInterval,
    parentPipelineType,
    parseOpenSearchInterval,
    parseInterval,
    propFilter,
    siblingPipelineType,
    termsAggFilter,
    toAbsoluteDates,
  },
  getRequestInspectorStats,
  getResponseInspectorStats,
  tabifyAggResponse,
  tabifyGetColumns,
};

/*
 * UI components
 */

export {
  SearchBar,
  SearchBarProps,
  StatefulSearchBarProps,
  IndexPatternSelectProps,
  QueryStringInput,
  QueryStringInputProps,
  DataPublicPluginStartUi,
} from './ui';

/**
 * Types to be shared externally
 * @public
 */
export { Filter, Query, RefreshInterval, TimeRange } from '../common';

export {
  createSavedQueryService,
  connectStorageToQueryState,
  connectToQueryState,
  syncQueryStateWithUrl,
  QueryState,
  getDefaultQuery,
  FilterManager,
  SavedQuery,
  SavedQueryService,
  SavedQueryTimeFilter,
  InputTimeRange,
  TimeHistory,
  TimefilterContract,
  TimeHistoryContract,
  QueryStateChange,
  QueryStart,
} from './query';

export { AggsStart } from './search/aggs';

export {
  getTime,
  // osd field types
  castOpenSearchToOsdFieldTypeName,
  getOsdTypeNames,
} from '../common';

export { isTimeRange, isQuery, isFilter, isFilters } from '../common';

export { ACTION_GLOBAL_APPLY_FILTER, ApplyGlobalFilterActionContext } from './actions';

export * from '../common/field_mapping';

/*
 * Plugin setup
 */

import { DataPublicPlugin } from './plugin';

export function plugin(initializerContext: PluginInitializerContext<ConfigSchema>) {
  return new DataPublicPlugin(initializerContext);
}

export {
  DataPublicPluginSetup,
  DataPublicPluginStart,
  IDataPluginServices,
  DataPublicPluginStartActions,
} from './types';

// Export plugin after all other imports
export { DataPublicPlugin as Plugin };

// Export datasources
export {
  DataSource,
  IDataSourceMetadata,
  IDataSetParams,
  IDataSourceQueryParams,
  IDataSourceQueryResult,
  SourceDataSet,
  DataSourceConnectionStatus,
  DataSourceFactory,
} from './data_sources/datasource';
export {
  DataSourceRegistrationError,
  DataSourceService,
  IDataSourceFilter,
  IDataSourceRegistrationResult,
} from './data_sources/datasource_services';
export {
  DataSourceSelectable,
  DataSourceSelectableProps,
  DataSourceGroup,
  DataSourceOption,
} from './data_sources/datasource_selector';
