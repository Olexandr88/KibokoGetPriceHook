"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  getExchangeRate: () => getExchangeRate,
  getPairPrice: () => getPairPrice,
  getRealPrice: () => getRealPrice,
  timeStampToDate: () => timeStampToDate
});
module.exports = __toCommonJS(src_exports);

// src/functions.ts
var import_axios = __toESM(require("axios"));
var import_starknet = require("starknet");

// src/pragmaabi.ts
var PRAGMA_ABI = [
  {
    "type": "impl",
    "name": "IOracleImpl",
    "interface_name": "pragma::oracle::oracle::IOracleABI"
  },
  {
    "type": "enum",
    "name": "pragma::entry::structs::DataType",
    "variants": [
      {
        "name": "SpotEntry",
        "type": "core::felt252"
      },
      {
        "name": "FutureEntry",
        "type": "(core::felt252, core::integer::u64)"
      },
      {
        "name": "GenericEntry",
        "type": "core::felt252"
      }
    ]
  },
  {
    "type": "enum",
    "name": "core::option::Option::<core::integer::u64>",
    "variants": [
      {
        "name": "Some",
        "type": "core::integer::u64"
      },
      {
        "name": "None",
        "type": "()"
      }
    ]
  },
  {
    "type": "struct",
    "name": "pragma::entry::structs::PragmaPricesResponse",
    "members": [
      {
        "name": "price",
        "type": "core::integer::u128"
      },
      {
        "name": "decimals",
        "type": "core::integer::u32"
      },
      {
        "name": "last_updated_timestamp",
        "type": "core::integer::u64"
      },
      {
        "name": "num_sources_aggregated",
        "type": "core::integer::u32"
      },
      {
        "name": "expiration_timestamp",
        "type": "core::option::Option::<core::integer::u64>"
      }
    ]
  },
  {
    "type": "struct",
    "name": "core::array::Span::<core::felt252>",
    "members": [
      {
        "name": "snapshot",
        "type": "@core::array::Array::<core::felt252>"
      }
    ]
  },
  {
    "type": "enum",
    "name": "pragma::entry::structs::AggregationMode",
    "variants": [
      {
        "name": "Median",
        "type": "()"
      },
      {
        "name": "Mean",
        "type": "()"
      },
      {
        "name": "Error",
        "type": "()"
      }
    ]
  },
  {
    "type": "struct",
    "name": "core::array::Span::<pragma::entry::structs::DataType>",
    "members": [
      {
        "name": "snapshot",
        "type": "@core::array::Array::<pragma::entry::structs::DataType>"
      }
    ]
  },
  {
    "type": "struct",
    "name": "core::array::Span::<pragma::entry::structs::PragmaPricesResponse>",
    "members": [
      {
        "name": "snapshot",
        "type": "@core::array::Array::<pragma::entry::structs::PragmaPricesResponse>"
      }
    ]
  },
  {
    "type": "struct",
    "name": "pragma::entry::structs::BaseEntry",
    "members": [
      {
        "name": "timestamp",
        "type": "core::integer::u64"
      },
      {
        "name": "source",
        "type": "core::felt252"
      },
      {
        "name": "publisher",
        "type": "core::felt252"
      }
    ]
  },
  {
    "type": "struct",
    "name": "pragma::entry::structs::SpotEntry",
    "members": [
      {
        "name": "base",
        "type": "pragma::entry::structs::BaseEntry"
      },
      {
        "name": "price",
        "type": "core::integer::u128"
      },
      {
        "name": "pair_id",
        "type": "core::felt252"
      },
      {
        "name": "volume",
        "type": "core::integer::u128"
      }
    ]
  },
  {
    "type": "struct",
    "name": "pragma::entry::structs::FutureEntry",
    "members": [
      {
        "name": "base",
        "type": "pragma::entry::structs::BaseEntry"
      },
      {
        "name": "price",
        "type": "core::integer::u128"
      },
      {
        "name": "pair_id",
        "type": "core::felt252"
      },
      {
        "name": "volume",
        "type": "core::integer::u128"
      },
      {
        "name": "expiration_timestamp",
        "type": "core::integer::u64"
      }
    ]
  },
  {
    "type": "struct",
    "name": "pragma::entry::structs::GenericEntry",
    "members": [
      {
        "name": "base",
        "type": "pragma::entry::structs::BaseEntry"
      },
      {
        "name": "key",
        "type": "core::felt252"
      },
      {
        "name": "value",
        "type": "core::integer::u128"
      }
    ]
  },
  {
    "type": "enum",
    "name": "pragma::entry::structs::PossibleEntries",
    "variants": [
      {
        "name": "Spot",
        "type": "pragma::entry::structs::SpotEntry"
      },
      {
        "name": "Future",
        "type": "pragma::entry::structs::FutureEntry"
      },
      {
        "name": "Generic",
        "type": "pragma::entry::structs::GenericEntry"
      }
    ]
  },
  {
    "type": "struct",
    "name": "core::array::Span::<pragma::entry::structs::PossibleEntries>",
    "members": [
      {
        "name": "snapshot",
        "type": "@core::array::Array::<pragma::entry::structs::PossibleEntries>"
      }
    ]
  },
  {
    "type": "struct",
    "name": "pragma::entry::structs::Checkpoint",
    "members": [
      {
        "name": "timestamp",
        "type": "core::integer::u64"
      },
      {
        "name": "value",
        "type": "core::integer::u128"
      },
      {
        "name": "aggregation_mode",
        "type": "pragma::entry::structs::AggregationMode"
      },
      {
        "name": "num_sources_aggregated",
        "type": "core::integer::u32"
      }
    ]
  },
  {
    "type": "enum",
    "name": "pragma::entry::structs::SimpleDataType",
    "variants": [
      {
        "name": "SpotEntry",
        "type": "()"
      },
      {
        "name": "FutureEntry",
        "type": "()"
      }
    ]
  },
  {
    "type": "enum",
    "name": "core::bool",
    "variants": [
      {
        "name": "False",
        "type": "()"
      },
      {
        "name": "True",
        "type": "()"
      }
    ]
  },
  {
    "type": "struct",
    "name": "pragma::entry::structs::Currency",
    "members": [
      {
        "name": "id",
        "type": "core::felt252"
      },
      {
        "name": "decimals",
        "type": "core::integer::u32"
      },
      {
        "name": "is_abstract_currency",
        "type": "core::bool"
      },
      {
        "name": "starknet_address",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "ethereum_address",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    "type": "struct",
    "name": "pragma::entry::structs::Pair",
    "members": [
      {
        "name": "id",
        "type": "core::felt252"
      },
      {
        "name": "quote_currency_id",
        "type": "core::felt252"
      },
      {
        "name": "base_currency_id",
        "type": "core::felt252"
      }
    ]
  },
  {
    "type": "interface",
    "name": "pragma::oracle::oracle::IOracleABI",
    "items": [
      {
        "type": "function",
        "name": "get_decimals",
        "inputs": [
          {
            "name": "data_type",
            "type": "pragma::entry::structs::DataType"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u32"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_data_median",
        "inputs": [
          {
            "name": "data_type",
            "type": "pragma::entry::structs::DataType"
          }
        ],
        "outputs": [
          {
            "type": "pragma::entry::structs::PragmaPricesResponse"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_data_median_for_sources",
        "inputs": [
          {
            "name": "data_type",
            "type": "pragma::entry::structs::DataType"
          },
          {
            "name": "sources",
            "type": "core::array::Span::<core::felt252>"
          }
        ],
        "outputs": [
          {
            "type": "pragma::entry::structs::PragmaPricesResponse"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_data",
        "inputs": [
          {
            "name": "data_type",
            "type": "pragma::entry::structs::DataType"
          },
          {
            "name": "aggregation_mode",
            "type": "pragma::entry::structs::AggregationMode"
          }
        ],
        "outputs": [
          {
            "type": "pragma::entry::structs::PragmaPricesResponse"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_data_median_multi",
        "inputs": [
          {
            "name": "data_types",
            "type": "core::array::Span::<pragma::entry::structs::DataType>"
          },
          {
            "name": "sources",
            "type": "core::array::Span::<core::felt252>"
          }
        ],
        "outputs": [
          {
            "type": "core::array::Span::<pragma::entry::structs::PragmaPricesResponse>"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_data_entry",
        "inputs": [
          {
            "name": "data_type",
            "type": "pragma::entry::structs::DataType"
          },
          {
            "name": "source",
            "type": "core::felt252"
          },
          {
            "name": "publisher",
            "type": "core::felt252"
          }
        ],
        "outputs": [
          {
            "type": "pragma::entry::structs::PossibleEntries"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_data_entry_for_publishers",
        "inputs": [
          {
            "name": "data_type",
            "type": "pragma::entry::structs::DataType"
          },
          {
            "name": "source",
            "type": "core::felt252"
          }
        ],
        "outputs": [
          {
            "type": "pragma::entry::structs::PossibleEntries"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_data_for_sources",
        "inputs": [
          {
            "name": "data_type",
            "type": "pragma::entry::structs::DataType"
          },
          {
            "name": "aggregation_mode",
            "type": "pragma::entry::structs::AggregationMode"
          },
          {
            "name": "sources",
            "type": "core::array::Span::<core::felt252>"
          }
        ],
        "outputs": [
          {
            "type": "pragma::entry::structs::PragmaPricesResponse"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_data_entries",
        "inputs": [
          {
            "name": "data_type",
            "type": "pragma::entry::structs::DataType"
          }
        ],
        "outputs": [
          {
            "type": "core::array::Span::<pragma::entry::structs::PossibleEntries>"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_data_entries_for_sources",
        "inputs": [
          {
            "name": "data_type",
            "type": "pragma::entry::structs::DataType"
          },
          {
            "name": "sources",
            "type": "core::array::Span::<core::felt252>"
          }
        ],
        "outputs": [
          {
            "type": "(core::array::Span::<pragma::entry::structs::PossibleEntries>, core::integer::u64)"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_last_checkpoint_before",
        "inputs": [
          {
            "name": "data_type",
            "type": "pragma::entry::structs::DataType"
          },
          {
            "name": "timestamp",
            "type": "core::integer::u64"
          },
          {
            "name": "aggregation_mode",
            "type": "pragma::entry::structs::AggregationMode"
          }
        ],
        "outputs": [
          {
            "type": "(pragma::entry::structs::Checkpoint, core::integer::u64)"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_data_with_USD_hop",
        "inputs": [
          {
            "name": "base_currency_id",
            "type": "core::felt252"
          },
          {
            "name": "quote_currency_id",
            "type": "core::felt252"
          },
          {
            "name": "aggregation_mode",
            "type": "pragma::entry::structs::AggregationMode"
          },
          {
            "name": "typeof",
            "type": "pragma::entry::structs::SimpleDataType"
          },
          {
            "name": "expiration_timestamp",
            "type": "core::option::Option::<core::integer::u64>"
          }
        ],
        "outputs": [
          {
            "type": "pragma::entry::structs::PragmaPricesResponse"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_publisher_registry_address",
        "inputs": [],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_latest_checkpoint_index",
        "inputs": [
          {
            "name": "data_type",
            "type": "pragma::entry::structs::DataType"
          },
          {
            "name": "aggregation_mode",
            "type": "pragma::entry::structs::AggregationMode"
          }
        ],
        "outputs": [
          {
            "type": "(core::integer::u64, core::bool)"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_latest_checkpoint",
        "inputs": [
          {
            "name": "data_type",
            "type": "pragma::entry::structs::DataType"
          },
          {
            "name": "aggregation_mode",
            "type": "pragma::entry::structs::AggregationMode"
          }
        ],
        "outputs": [
          {
            "type": "pragma::entry::structs::Checkpoint"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_checkpoint",
        "inputs": [
          {
            "name": "data_type",
            "type": "pragma::entry::structs::DataType"
          },
          {
            "name": "checkpoint_index",
            "type": "core::integer::u64"
          },
          {
            "name": "aggregation_mode",
            "type": "pragma::entry::structs::AggregationMode"
          }
        ],
        "outputs": [
          {
            "type": "pragma::entry::structs::Checkpoint"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_sources_threshold",
        "inputs": [],
        "outputs": [
          {
            "type": "core::integer::u32"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_admin_address",
        "inputs": [],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_all_publishers",
        "inputs": [
          {
            "name": "data_type",
            "type": "pragma::entry::structs::DataType"
          }
        ],
        "outputs": [
          {
            "type": "core::array::Span::<core::felt252>"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_all_sources",
        "inputs": [
          {
            "name": "data_type",
            "type": "pragma::entry::structs::DataType"
          }
        ],
        "outputs": [
          {
            "type": "core::array::Span::<core::felt252>"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "publish_data",
        "inputs": [
          {
            "name": "new_entry",
            "type": "pragma::entry::structs::PossibleEntries"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "publish_data_entries",
        "inputs": [
          {
            "name": "new_entries",
            "type": "core::array::Span::<pragma::entry::structs::PossibleEntries>"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "set_admin_address",
        "inputs": [
          {
            "name": "new_admin_address",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "update_publisher_registry_address",
        "inputs": [
          {
            "name": "new_publisher_registry_address",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "add_currency",
        "inputs": [
          {
            "name": "new_currency",
            "type": "pragma::entry::structs::Currency"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "update_currency",
        "inputs": [
          {
            "name": "currency_id",
            "type": "core::felt252"
          },
          {
            "name": "currency",
            "type": "pragma::entry::structs::Currency"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "add_pair",
        "inputs": [
          {
            "name": "new_pair",
            "type": "pragma::entry::structs::Pair"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "set_checkpoint",
        "inputs": [
          {
            "name": "data_type",
            "type": "pragma::entry::structs::DataType"
          },
          {
            "name": "aggregation_mode",
            "type": "pragma::entry::structs::AggregationMode"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "set_checkpoints",
        "inputs": [
          {
            "name": "data_types",
            "type": "core::array::Span::<pragma::entry::structs::DataType>"
          },
          {
            "name": "aggregation_mode",
            "type": "pragma::entry::structs::AggregationMode"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "remove_source",
        "inputs": [
          {
            "name": "source",
            "type": "core::felt252"
          },
          {
            "name": "data_type",
            "type": "pragma::entry::structs::DataType"
          }
        ],
        "outputs": [
          {
            "type": "core::bool"
          }
        ],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "set_sources_threshold",
        "inputs": [
          {
            "name": "threshold",
            "type": "core::integer::u32"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "upgrade",
        "inputs": [
          {
            "name": "impl_hash",
            "type": "core::starknet::class_hash::ClassHash"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      }
    ]
  },
  {
    "type": "struct",
    "name": "core::array::Span::<pragma::entry::structs::Currency>",
    "members": [
      {
        "name": "snapshot",
        "type": "@core::array::Array::<pragma::entry::structs::Currency>"
      }
    ]
  },
  {
    "type": "struct",
    "name": "core::array::Span::<pragma::entry::structs::Pair>",
    "members": [
      {
        "name": "snapshot",
        "type": "@core::array::Array::<pragma::entry::structs::Pair>"
      }
    ]
  },
  {
    "type": "constructor",
    "name": "constructor",
    "inputs": [
      {
        "name": "admin_address",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "publisher_registry_address",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "currencies",
        "type": "core::array::Span::<pragma::entry::structs::Currency>"
      },
      {
        "name": "pairs",
        "type": "core::array::Span::<pragma::entry::structs::Pair>"
      }
    ]
  },
  {
    "type": "event",
    "name": "pragma::oracle::oracle::Oracle::UpdatedPublisherRegistryAddress",
    "kind": "struct",
    "members": [
      {
        "name": "old_publisher_registry_address",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      },
      {
        "name": "new_publisher_registry_address",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "pragma::oracle::oracle::Oracle::SubmittedSpotEntry",
    "kind": "struct",
    "members": [
      {
        "name": "spot_entry",
        "type": "pragma::entry::structs::SpotEntry",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "pragma::oracle::oracle::Oracle::SubmittedFutureEntry",
    "kind": "struct",
    "members": [
      {
        "name": "future_entry",
        "type": "pragma::entry::structs::FutureEntry",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "pragma::oracle::oracle::Oracle::SubmittedGenericEntry",
    "kind": "struct",
    "members": [
      {
        "name": "generic_entry",
        "type": "pragma::entry::structs::GenericEntry",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "pragma::oracle::oracle::Oracle::SubmittedCurrency",
    "kind": "struct",
    "members": [
      {
        "name": "currency",
        "type": "pragma::entry::structs::Currency",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "pragma::oracle::oracle::Oracle::UpdatedCurrency",
    "kind": "struct",
    "members": [
      {
        "name": "currency",
        "type": "pragma::entry::structs::Currency",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "pragma::oracle::oracle::Oracle::SubmittedPair",
    "kind": "struct",
    "members": [
      {
        "name": "pair",
        "type": "pragma::entry::structs::Pair",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "pragma::oracle::oracle::Oracle::CheckpointSpotEntry",
    "kind": "struct",
    "members": [
      {
        "name": "pair_id",
        "type": "core::felt252",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "pragma::oracle::oracle::Oracle::CheckpointFutureEntry",
    "kind": "struct",
    "members": [
      {
        "name": "pair_id",
        "type": "core::felt252",
        "kind": "data"
      },
      {
        "name": "expiration_timestamp",
        "type": "core::integer::u64",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "pragma::oracle::oracle::Oracle::ChangedAdmin",
    "kind": "struct",
    "members": [
      {
        "name": "new_admin",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "pragma::oracle::oracle::Oracle::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "UpdatedPublisherRegistryAddress",
        "type": "pragma::oracle::oracle::Oracle::UpdatedPublisherRegistryAddress",
        "kind": "nested"
      },
      {
        "name": "SubmittedSpotEntry",
        "type": "pragma::oracle::oracle::Oracle::SubmittedSpotEntry",
        "kind": "nested"
      },
      {
        "name": "SubmittedFutureEntry",
        "type": "pragma::oracle::oracle::Oracle::SubmittedFutureEntry",
        "kind": "nested"
      },
      {
        "name": "SubmittedGenericEntry",
        "type": "pragma::oracle::oracle::Oracle::SubmittedGenericEntry",
        "kind": "nested"
      },
      {
        "name": "SubmittedCurrency",
        "type": "pragma::oracle::oracle::Oracle::SubmittedCurrency",
        "kind": "nested"
      },
      {
        "name": "UpdatedCurrency",
        "type": "pragma::oracle::oracle::Oracle::UpdatedCurrency",
        "kind": "nested"
      },
      {
        "name": "SubmittedPair",
        "type": "pragma::oracle::oracle::Oracle::SubmittedPair",
        "kind": "nested"
      },
      {
        "name": "CheckpointSpotEntry",
        "type": "pragma::oracle::oracle::Oracle::CheckpointSpotEntry",
        "kind": "nested"
      },
      {
        "name": "CheckpointFutureEntry",
        "type": "pragma::oracle::oracle::Oracle::CheckpointFutureEntry",
        "kind": "nested"
      },
      {
        "name": "ChangedAdmin",
        "type": "pragma::oracle::oracle::Oracle::ChangedAdmin",
        "kind": "nested"
      }
    ]
  }
];
var PRAGMA_CONTRACT_ADDRESS = "0x06df335982dddce41008e4c03f2546fa27276567b5274c7d0c1262f3c2b5d167";
var pragmaabi_default = PRAGMA_ABI;

// src/functions.ts
var import_bignumber = require("bignumber.js");
var pragma_contract = new import_starknet.Contract(pragmaabi_default, PRAGMA_CONTRACT_ADDRESS);
function getRealPrice(val) {
  let decimals = (0, import_bignumber.BigNumber)(val.decimals).toNumber();
  let ts = (0, import_bignumber.BigNumber)(val.last_updated_timestamp).toNumber();
  let real_price = {
    price: (0, import_bignumber.BigNumber)(val.price).dividedBy(10 ** decimals).toNumber(),
    last_updated_timestamp: timeStampToDate(ts),
    num_sources_aggregated: (0, import_bignumber.BigNumber)(val.num_sources_aggregated).toNumber()
  };
  return real_price;
}
function timeStampToDate(timestamp) {
  if (!timestamp)
    return null;
  const timestampInMilliseconds = timestamp * 1e3;
  const date = new Date(timestampInMilliseconds);
  return date;
}
var getPairPrice = async (pair) => {
  if (pragma_contract) {
    try {
      const SPOTENTRY_ENUM = new import_starknet.CairoCustomEnum({
        SpotEntry: pair
      });
      const res = await pragma_contract.get_data_median(SPOTENTRY_ENUM);
      const price = getRealPrice(res);
      return price;
    } catch (err) {
      console.log("pair not found");
    }
  }
};
var getExchangeRate = async (symbol, amount) => {
  try {
    const response = await import_axios.default.get(
      `https://api.coinbase.com/v2/exchange-rates?currency=${symbol}`
    );
    if (response.status === 200) {
      const data = response.data;
      if (data && data.data && data.data.rates && data.data.rates.KES) {
        const baseCoinRate = data.data.rates.KES;
        const amountInKesReceived = amount * baseCoinRate;
        return amountInKesReceived;
      } else {
        console.log("No exchange rate data found for KES");
      }
    } else {
      console.log("Failed to fetch exchange rate from Coinbase API");
    }
  } catch (error) {
    console.log("Unable to get exchange rate", error);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getExchangeRate,
  getPairPrice,
  getRealPrice,
  timeStampToDate
});
