export default [
  {
    label: '&',
    insertText: '&',
    documentation: 'Bitwise AND'
  },
  {
    label: '>',
    insertText: '> $1',
    documentation: 'Greater than operator'
  },
  {
    label: '>>',
    insertText: '>> $1',
    documentation: 'Right shift'
  },
  {
    label: '>=',
    insertText: '>= $1',
    documentation: 'Greater than or equal operator'
  },
  {
    label: '<',
    insertText: '< $1',
    documentation: 'Less than operator'
  },
  {
    label: '<>',
    insertText: '<> $1',
    documentation: 'Not equal operator'
  },
  {
    label: '<<',
    insertText: '<< $1',
    documentation: 'Left shift'
  },
  {
    label: '<=',
    insertText: '<= $1',
    documentation: 'Less than or equal operator'
  },
  {
    label: '<=>',
    insertText: '<=> $1',
    documentation: 'NULL-safe equal to operator'
  },
  {
    label: '%',
    insertText: '% $1',
    documentation: 'Modulo operator'
  },
  {
    label: '*',
    insertText: '* $1',
    documentation: 'Multiplication operator'
  },
  {
    label: '+',
    insertText: '+ $1',
    documentation: 'Addition operator'
  },
  {
    label: '-',
    insertText: '- $1',
    documentation: 'Minus operator'
  },
  {
    label: '-',
    insertText: '- $1',
    documentation: 'Change the sign of the argument'
  },
  {
    label: '->',
    insertText: '-> $1',
    documentation:
      'Return value from JSON column after evaluating path; equivalent to JSON_EXTRACT().'
  },
  {
    label: '->>',
    insertText: '->> $1',
    documentation:
      'Return value from JSON column after evaluating path and unquoting the result; equivalent to JSON_UNQUOTE(JSON_EXTRACT()).'
  },
  {
    label: '/',
    insertText: '/ $1',
    documentation: 'Division operator'
  },
  {
    label: ':=',
    insertText: ':= $1',
    documentation: 'Assign a value'
  },
  {
    label: '=',
    insertText: '= $1',
    documentation:
      'Assign a value (as part of a [`SET`]() statement, or as part of the `SET` clause in an [`UPDATE`]() statement)'
  },
  {
    label: '=',
    insertText: '= $1',
    documentation: 'Equal operator'
  },
  {
    label: '^',
    insertText: '^ $1',
    documentation: 'Bitwise XOR'
  },
  {
    label: 'abs',
    insertText: 'abs()',
    documentation: 'Return the absolute value'
  },
  {
    label: 'acos',
    insertText: 'acos()',
    documentation: 'Return the arc cosine'
  },
  {
    label: 'adddate',
    insertText: 'adddate()',
    documentation: 'Add time values (intervals) to a date value'
  },
  {
    label: 'addtime',
    insertText: 'addtime()',
    documentation: 'Add time'
  },
  {
    label: 'aes_decrypt',
    insertText: 'aes_decrypt()',
    documentation: 'Decrypt using AES'
  },
  {
    label: 'aes_encrypt',
    insertText: 'aes_encrypt()',
    documentation: 'Encrypt using AES'
  },
  {
    label: 'and',
    insertText: 'and $1',
    documentation: 'Logical AND'
  },
  {
    label: 'any_value',
    insertText: 'any_value()',
    documentation: 'Suppress ONLY_FULL_GROUP_BY value rejection'
  },
  {
    label: 'ascii',
    insertText: 'ascii()',
    documentation: 'Return numeric value of left-most character'
  },
  {
    label: 'asin',
    insertText: 'asin()',
    documentation: 'Return the arc sine'
  },
  {
    label: 'asynchronous_connection_failover_add_managed',
    insertText: 'asynchronous_connection_failover_add_managed()',
    documentation:
      'Add group member source server configuration information to a replication channel source list'
  },
  {
    label: 'asynchronous_connection_failover_add_source',
    insertText: 'asynchronous_connection_failover_add_source()',
    documentation:
      'Add source server configuration information server to a replication channel source list'
  },
  {
    label: 'asynchronous_connection_failover_delete_managed',
    insertText: 'asynchronous_connection_failover_delete_managed()',
    documentation:
      'Remove a managed group from a replication channel source list'
  },
  {
    label: 'asynchronous_connection_failover_delete_source',
    insertText: 'asynchronous_connection_failover_delete_source()',
    documentation:
      'Remove a source server from a replication channel source list'
  },
  {
    label: 'asynchronous_connection_failover_reset',
    insertText: 'asynchronous_connection_failover_reset()',
    documentation:
      'Remove all settings relating to group replication asynchronous failover'
  },
  {
    label: 'atan',
    insertText: 'atan()',
    documentation: 'Return the arc tangent'
  },
  {
    label: 'atan2',
    insertText: 'atan2()',
    documentation: 'Return the arc tangent of the two arguments'
  },
  {
    label: 'avg',
    insertText: 'avg()',
    documentation: 'Return the average value of the argument'
  },
  {
    label: 'benchmark',
    insertText: 'benchmark()',
    documentation: 'Repeatedly execute an expression'
  },
  {
    label: 'between ... and ...',
    insertText: 'between ... and ... $1',
    documentation: 'Whether a value is within a range of values'
  },
  {
    label: 'bin',
    insertText: 'bin()',
    documentation:
      'Return a string containing binary representation of a number'
  },
  {
    label: 'bin_to_uuid',
    insertText: 'bin_to_uuid()',
    documentation: 'Convert binary UUID to string'
  },
  {
    label: 'binary',
    insertText: 'binary $1',
    documentation: 'Cast a string to a binary string'
  },
  {
    label: 'bit_and',
    insertText: 'bit_and()',
    documentation: 'Return bitwise AND'
  },
  {
    label: 'bit_count',
    insertText: 'bit_count()',
    documentation: 'Return the number of bits that are set'
  },
  {
    label: 'bit_length',
    insertText: 'bit_length()',
    documentation: 'Return length of argument in bits'
  },
  {
    label: 'bit_or',
    insertText: 'bit_or()',
    documentation: 'Return bitwise OR'
  },
  {
    label: 'bit_xor',
    insertText: 'bit_xor()',
    documentation: 'Return bitwise XOR'
  },
  {
    label: 'can_access_column',
    insertText: 'can_access_column()',
    documentation: 'Internal use only'
  },
  {
    label: 'can_access_database',
    insertText: 'can_access_database()',
    documentation: 'Internal use only'
  },
  {
    label: 'can_access_table',
    insertText: 'can_access_table()',
    documentation: 'Internal use only'
  },
  {
    label: 'can_access_user',
    insertText: 'can_access_user()',
    documentation: 'Internal use only'
  },
  {
    label: 'can_access_view',
    insertText: 'can_access_view()',
    documentation: 'Internal use only'
  },
  {
    label: 'case',
    insertText: 'case $1',
    documentation: 'Case operator'
  },
  {
    label: 'cast',
    insertText: 'cast()',
    documentation: 'Cast a value as a certain type'
  },
  {
    label: 'ceil',
    insertText: 'ceil()',
    documentation:
      'Return the smallest integer value not less than the argument'
  },
  {
    label: 'ceiling',
    insertText: 'ceiling()',
    documentation:
      'Return the smallest integer value not less than the argument'
  },
  {
    label: 'char',
    insertText: 'char()',
    documentation: 'Return the character for each integer passed'
  },
  {
    label: 'char_length',
    insertText: 'char_length()',
    documentation: 'Return number of characters in argument'
  },
  {
    label: 'character_length',
    insertText: 'character_length()',
    documentation: 'Synonym for CHAR_LENGTH()'
  },
  {
    label: 'charset',
    insertText: 'charset()',
    documentation: 'Return the character set of the argument'
  },
  {
    label: 'coalesce',
    insertText: 'coalesce()',
    documentation: 'Return the first non-NULL argument'
  },
  {
    label: 'coercibility',
    insertText: 'coercibility()',
    documentation:
      'Return the collation coercibility value of the string argument'
  },
  {
    label: 'collation',
    insertText: 'collation()',
    documentation: 'Return the collation of the string argument'
  },
  {
    label: 'compress',
    insertText: 'compress()',
    documentation: 'Return result as a binary string'
  },
  {
    label: 'concat',
    insertText: 'concat()',
    documentation: 'Return concatenated string'
  },
  {
    label: 'concat_ws',
    insertText: 'concat_ws()',
    documentation: 'Return concatenate with separator'
  },
  {
    label: 'connection_id',
    insertText: 'connection_id()',
    documentation: 'Return the connection ID (thread ID) for the connection'
  },
  {
    label: 'conv',
    insertText: 'conv()',
    documentation: 'Convert numbers between different number bases'
  },
  {
    label: 'convert',
    insertText: 'convert()',
    documentation: 'Cast a value as a certain type'
  },
  {
    label: 'convert_tz',
    insertText: 'convert_tz()',
    documentation: 'Convert from one time zone to another'
  },
  {
    label: 'cos',
    insertText: 'cos()',
    documentation: 'Return the cosine'
  },
  {
    label: 'cot',
    insertText: 'cot()',
    documentation: 'Return the cotangent'
  },
  {
    label: 'count',
    insertText: 'count($1)',
    documentation: 'Return the count of a number of different values'
  },
  {
    label: 'crc32',
    insertText: 'crc32()',
    documentation: 'Compute a cyclic redundancy check value'
  },
  {
    label: 'cume_dist',
    insertText: 'cume_dist()',
    documentation: 'Cumulative distribution value'
  },
  {
    label: 'curdate',
    insertText: 'curdate()',
    documentation: 'Return the current date'
  },
  {
    label: 'current_date',
    insertText: 'current_date()',
    documentation: 'Synonyms for CURDATE()'
  },
  {
    label: 'current_role',
    insertText: 'current_role()',
    documentation: 'Return the current active roles'
  },
  {
    label: 'current_time',
    insertText: 'current_time()',
    documentation: 'Synonyms for CURTIME()'
  },
  {
    label: 'current_timestamp',
    insertText: 'current_timestamp()',
    documentation: 'Synonyms for NOW()'
  },
  {
    label: 'current_user',
    insertText: 'current_user()',
    documentation: 'The authenticated user name and host name'
  },
  {
    label: 'curtime',
    insertText: 'curtime()',
    documentation: 'Return the current time'
  },
  {
    label: 'database',
    insertText: 'database()',
    documentation: 'Return the default (current) database name'
  },
  {
    label: 'date',
    insertText: 'date()',
    documentation: 'Extract the date part of a date or datetime expression'
  },
  {
    label: 'date_add',
    insertText: 'date_add()',
    documentation: 'Add time values (intervals) to a date value'
  },
  {
    label: 'date_format',
    insertText: 'date_format()',
    documentation: 'Format date as specified'
  },
  {
    label: 'date_sub',
    insertText: 'date_sub()',
    documentation: 'Subtract a time value (interval) from a date'
  },
  {
    label: 'datediff',
    insertText: 'datediff()',
    documentation: 'Subtract two dates'
  },
  {
    label: 'day',
    insertText: 'day()',
    documentation: 'Synonym for DAYOFMONTH()'
  },
  {
    label: 'dayname',
    insertText: 'dayname()',
    documentation: 'Return the name of the weekday'
  },
  {
    label: 'dayofmonth',
    insertText: 'dayofmonth()',
    documentation: 'Return the day of the month (0-31)'
  },
  {
    label: 'dayofweek',
    insertText: 'dayofweek()',
    documentation: 'Return the weekday index of the argument'
  },
  {
    label: 'dayofyear',
    insertText: 'dayofyear()',
    documentation: 'Return the day of the year (1-366)'
  },
  {
    label: 'default',
    insertText: 'default()',
    documentation: 'Return the default value for a table column'
  },
  {
    label: 'degrees',
    insertText: 'degrees()',
    documentation: 'Convert radians to degrees'
  },
  {
    label: 'dense_rank',
    insertText: 'dense_rank()',
    documentation: 'Rank of current row within its partition, without gaps'
  },
  {
    label: 'div',
    insertText: 'div $1',
    documentation: 'Integer division'
  },
  {
    label: 'elt',
    insertText: 'elt()',
    documentation: 'Return string at index number'
  },
  {
    label: 'exists',
    insertText: 'exists()',
    documentation: 'Whether the result of a query contains any rows'
  },
  {
    label: 'exp',
    insertText: 'exp()',
    documentation: 'Raise to the power of'
  },
  {
    label: 'export_set',
    insertText: 'export_set()',
    documentation:
      'Return a string such that for every bit set in the value bits, you get an on string and for every unset bit, you get an off string'
  },
  {
    label: 'extract',
    insertText: 'extract()',
    documentation: 'Extract part of a date'
  },
  {
    label: 'extractvalue',
    insertText: 'extractvalue()',
    documentation: 'Extract a value from an XML string using XPath notation'
  },
  {
    label: 'field',
    insertText: 'field()',
    documentation: 'Index (position) of first argument in subsequent arguments'
  },
  {
    label: 'find_in_set',
    insertText: 'find_in_set()',
    documentation: 'Index (position) of first argument within second argument'
  },
  {
    label: 'first_value',
    insertText: 'first_value()',
    documentation: 'Value of argument from first row of window frame'
  },
  {
    label: 'floor',
    insertText: 'floor()',
    documentation:
      'Return the largest integer value not greater than the argument'
  },
  {
    label: 'format',
    insertText: 'format()',
    documentation:
      'Return a number formatted to specified number of decimal places'
  },
  {
    label: 'format_bytes',
    insertText: 'format_bytes()',
    documentation: 'Convert byte count to value with units'
  },
  {
    label: 'format_pico_time',
    insertText: 'format_pico_time()',
    documentation: 'Convert time in picoseconds to value with units'
  },
  {
    label: 'found_rows',
    insertText: 'found_rows()',
    documentation:
      'For a SELECT with a LIMIT clause, the number of rows that would be returned were there no LIMIT clause'
  },
  {
    label: 'from_base64',
    insertText: 'from_base64()',
    documentation: 'Decode base64 encoded string and return result'
  },
  {
    label: 'from_days',
    insertText: 'from_days()',
    documentation: 'Convert a day number to a date'
  },
  {
    label: 'from_unixtime',
    insertText: 'from_unixtime()',
    documentation: 'Format Unix timestamp as a date'
  },
  {
    label: 'geomcollection',
    insertText: 'geomcollection()',
    documentation: 'Construct geometry collection from geometries'
  },
  {
    label: 'geometrycollection',
    insertText: 'geometrycollection()',
    documentation: 'Construct geometry collection from geometries'
  },
  {
    label: 'get_dd_column_privileges',
    insertText: 'get_dd_column_privileges()',
    documentation: 'Internal use only'
  },
  {
    label: 'get_dd_create_options',
    insertText: 'get_dd_create_options()',
    documentation: 'Internal use only'
  },
  {
    label: 'get_dd_index_sub_part_length',
    insertText: 'get_dd_index_sub_part_length()',
    documentation: 'Internal use only'
  },
  {
    label: 'get_format',
    insertText: 'get_format()',
    documentation: 'Return a date format string'
  },
  {
    label: 'get_lock',
    insertText: 'get_lock()',
    documentation: 'Get a named lock'
  },
  {
    label: 'greatest',
    insertText: 'greatest()',
    documentation: 'Return the largest argument'
  },
  {
    label: 'group_concat',
    insertText: 'group_concat()',
    documentation: 'Return a concatenated string'
  },
  {
    label: 'group_replication_disable_member_action',
    insertText: 'group_replication_disable_member_action()',
    documentation: 'Disable member action for event specified'
  },
  {
    label: 'group_replication_enable_member_action',
    insertText: 'group_replication_enable_member_action()',
    documentation: 'Enable member action for event specified'
  },
  {
    label: 'group_replication_get_communication_protocol',
    insertText: 'group_replication_get_communication_protocol()',
    documentation:
      'Get version of group replication communication protocol currently in use'
  },
  {
    label: 'group_replication_get_write_concurrency',
    insertText: 'group_replication_get_write_concurrency()',
    documentation:
      'Get maximum number of consensus instances currently set for group'
  },
  {
    label: 'group_replication_reset_member_actions',
    insertText: 'group_replication_reset_member_actions()',
    documentation:
      'Reset all member actions to defaults and configuration version number to 1'
  },
  {
    label: 'group_replication_set_as_primary',
    insertText: 'group_replication_set_as_primary()',
    documentation: 'Make a specific group member the primary'
  },
  {
    label: 'group_replication_set_communication_protocol',
    insertText: 'group_replication_set_communication_protocol()',
    documentation:
      'Set version for group replication communication protocol to use'
  },
  {
    label: 'group_replication_set_write_concurrency',
    insertText: 'group_replication_set_write_concurrency()',
    documentation:
      'Set maximum number of consensus instances that can be executed in parallel'
  },
  {
    label: 'group_replication_switch_to_multi_primary_mode',
    insertText: 'group_replication_switch_to_multi_primary_mode()',
    documentation:
      'Changes the mode of a group running in single-primary mode to multi-primary mode'
  },
  {
    label: 'group_replication_switch_to_single_primary_mode',
    insertText: 'group_replication_switch_to_single_primary_mode()',
    documentation:
      'Changes the mode of a group running in multi-primary mode to single-primary mode'
  },
  {
    label: 'grouping',
    insertText: 'grouping()',
    documentation: 'Distinguish super-aggregate ROLLUP rows from regular rows'
  },
  {
    label: 'hex',
    insertText: 'hex()',
    documentation: 'Hexadecimal representation of decimal or string value'
  },
  {
    label: 'hour',
    insertText: 'hour()',
    documentation: 'Extract the hour'
  },
  {
    label: 'icu_version',
    insertText: 'icu_version()',
    documentation: 'ICU library version'
  },
  {
    label: 'if',
    insertText: 'if()',
    documentation: 'If/else construct'
  },
  {
    label: 'ifnull',
    insertText: 'ifnull()',
    documentation: 'Null if/else construct'
  },
  {
    label: 'in',
    insertText: 'in()',
    documentation: 'Whether a value is within a set of values'
  },
  {
    label: 'inet_aton',
    insertText: 'inet_aton()',
    documentation: 'Return the numeric value of an IP address'
  },
  {
    label: 'inet_ntoa',
    insertText: 'inet_ntoa()',
    documentation: 'Return the IP address from a numeric value'
  },
  {
    label: 'inet6_aton',
    insertText: 'inet6_aton()',
    documentation: 'Return the numeric value of an IP address'
  },
  {
    label: 'inet6_ntoa',
    insertText: 'inet6_ntoa()',
    documentation: 'Return the IP address from a numeric value'
  },
  {
    label: 'insert',
    insertText: 'insert()',
    documentation:
      'Insert substring at specified position up to specified number of characters'
  },
  {
    label: 'instr',
    insertText: 'instr()',
    documentation: 'Return the index of the first occurrence of a substring'
  },
  {
    label: 'internal_auto_increment',
    insertText: 'internal_auto_increment()',
    documentation: 'Internal use only'
  },
  {
    label: 'internal_avg_row_length',
    insertText: 'internal_avg_row_length()',
    documentation: 'Internal use only'
  },
  {
    label: 'internal_check_time',
    insertText: 'internal_check_time()',
    documentation: 'Internal use only'
  },
  {
    label: 'internal_checksum',
    insertText: 'internal_checksum()',
    documentation: 'Internal use only'
  },
  {
    label: 'internal_data_free',
    insertText: 'internal_data_free()',
    documentation: 'Internal use only'
  },
  {
    label: 'internal_data_length',
    insertText: 'internal_data_length()',
    documentation: 'Internal use only'
  },
  {
    label: 'internal_dd_char_length',
    insertText: 'internal_dd_char_length()',
    documentation: 'Internal use only'
  },
  {
    label: 'internal_get_comment_or_error',
    insertText: 'internal_get_comment_or_error()',
    documentation: 'Internal use only'
  },
  {
    label: 'internal_get_enabled_role_json',
    insertText: 'internal_get_enabled_role_json()',
    documentation: 'Internal use only'
  },
  {
    label: 'internal_get_hostname',
    insertText: 'internal_get_hostname()',
    documentation: 'Internal use only'
  },
  {
    label: 'internal_get_username',
    insertText: 'internal_get_username()',
    documentation: 'Internal use only'
  },
  {
    label: 'internal_get_view_warning_or_error',
    insertText: 'internal_get_view_warning_or_error()',
    documentation: 'Internal use only'
  },
  {
    label: 'internal_index_column_cardinality',
    insertText: 'internal_index_column_cardinality()',
    documentation: 'Internal use only'
  },
  {
    label: 'internal_index_length',
    insertText: 'internal_index_length()',
    documentation: 'Internal use only'
  },
  {
    label: 'internal_is_enabled_role',
    insertText: 'internal_is_enabled_role()',
    documentation: 'Internal use only'
  },
  {
    label: 'internal_is_mandatory_role',
    insertText: 'internal_is_mandatory_role()',
    documentation: 'Internal use only'
  },
  {
    label: 'internal_keys_disabled',
    insertText: 'internal_keys_disabled()',
    documentation: 'Internal use only'
  },
  {
    label: 'internal_max_data_length',
    insertText: 'internal_max_data_length()',
    documentation: 'Internal use only'
  },
  {
    label: 'internal_table_rows',
    insertText: 'internal_table_rows()',
    documentation: 'Internal use only'
  },
  {
    label: 'internal_update_time',
    insertText: 'internal_update_time()',
    documentation: 'Internal use only'
  },
  {
    label: 'interval',
    insertText: 'interval()',
    documentation:
      'Return the index of the argument that is less than the first argument'
  },
  {
    label: 'is',
    insertText: 'is $1',
    documentation: 'Test a value against a boolean'
  },
  {
    label: 'is_free_lock',
    insertText: 'is_free_lock()',
    documentation: 'Whether the named lock is free'
  },
  {
    label: 'is not',
    insertText: 'is not $1',
    documentation: 'Test a value against a boolean'
  },
  {
    label: 'is not null',
    insertText: 'is not null $1',
    documentation: 'NOT NULL value test'
  },
  {
    label: 'is null',
    insertText: 'is null $1',
    documentation: 'NULL value test'
  },
  {
    label: 'is_used_lock',
    insertText: 'is_used_lock()',
    documentation:
      'Whether the named lock is in use; return connection identifier if true'
  },
  {
    label: 'is_uuid',
    insertText: 'is_uuid()',
    documentation: 'Whether argument is a valid UUID'
  },
  {
    label: 'isnull',
    insertText: 'isnull()',
    documentation: 'Test whether the argument is NULL'
  },
  {
    label: 'json_array',
    insertText: 'json_array()',
    documentation: 'Create JSON array'
  },
  {
    label: 'json_array_append',
    insertText: 'json_array_append()',
    documentation: 'Append data to JSON document'
  },
  {
    label: 'json_array_insert',
    insertText: 'json_array_insert()',
    documentation: 'Insert into JSON array'
  },
  {
    label: 'json_arrayagg',
    insertText: 'json_arrayagg()',
    documentation: 'Return result set as a single JSON array'
  },
  {
    label: 'json_contains',
    insertText: 'json_contains()',
    documentation: 'Whether JSON document contains specific object at path'
  },
  {
    label: 'json_contains_path',
    insertText: 'json_contains_path()',
    documentation: 'Whether JSON document contains any data at path'
  },
  {
    label: 'json_depth',
    insertText: 'json_depth()',
    documentation: 'Maximum depth of JSON document'
  },
  {
    label: 'json_extract',
    insertText: 'json_extract()',
    documentation: 'Return data from JSON document'
  },
  {
    label: 'json_insert',
    insertText: 'json_insert()',
    documentation: 'Insert data into JSON document'
  },
  {
    label: 'json_keys',
    insertText: 'json_keys()',
    documentation: 'Array of keys from JSON document'
  },
  {
    label: 'json_length',
    insertText: 'json_length()',
    documentation: 'Number of elements in JSON document'
  },
  {
    label: 'json_merge',
    insertText: 'json_merge()',
    documentation:
      'Merge JSON documents, preserving duplicate keys. Deprecated synonym for JSON_MERGE_PRESERVE()'
  },
  {
    label: 'json_merge_patch',
    insertText: 'json_merge_patch()',
    documentation: 'Merge JSON documents, replacing values of duplicate keys'
  },
  {
    label: 'json_merge_preserve',
    insertText: 'json_merge_preserve()',
    documentation: 'Merge JSON documents, preserving duplicate keys'
  },
  {
    label: 'json_object',
    insertText: 'json_object()',
    documentation: 'Create JSON object'
  },
  {
    label: 'json_objectagg',
    insertText: 'json_objectagg()',
    documentation: 'Return result set as a single JSON object'
  },
  {
    label: 'json_overlaps',
    insertText: 'json_overlaps()',
    documentation:
      'Compares two JSON documents, returns TRUE (1) if these have any key-value pairs or array elements in common, otherwise FALSE (0)'
  },
  {
    label: 'json_pretty',
    insertText: 'json_pretty()',
    documentation: 'Print a JSON document in human-readable format'
  },
  {
    label: 'json_quote',
    insertText: 'json_quote()',
    documentation: 'Quote JSON document'
  },
  {
    label: 'json_remove',
    insertText: 'json_remove()',
    documentation: 'Remove data from JSON document'
  },
  {
    label: 'json_replace',
    insertText: 'json_replace()',
    documentation: 'Replace values in JSON document'
  },
  {
    label: 'json_schema_valid',
    insertText: 'json_schema_valid()',
    documentation:
      'Validate JSON document against JSON schema; returns TRUE/1 if document validates against schema, or FALSE/0 if it does not'
  },
  {
    label: 'json_schema_validation_report',
    insertText: 'json_schema_validation_report()',
    documentation:
      'Validate JSON document against JSON schema; returns report in JSON format on outcome on validation including success or failure and reasons for failure'
  },
  {
    label: 'json_search',
    insertText: 'json_search()',
    documentation: 'Path to value within JSON document'
  },
  {
    label: 'json_set',
    insertText: 'json_set()',
    documentation: 'Insert data into JSON document'
  },
  {
    label: 'json_storage_free',
    insertText: 'json_storage_free()',
    documentation:
      'Freed space within binary representation of JSON column value following partial update'
  },
  {
    label: 'json_storage_size',
    insertText: 'json_storage_size()',
    documentation:
      'Space used for storage of binary representation of a JSON document'
  },
  {
    label: 'json_table',
    insertText: 'json_table()',
    documentation: 'Return data from a JSON expression as a relational table'
  },
  {
    label: 'json_type',
    insertText: 'json_type()',
    documentation: 'Type of JSON value'
  },
  {
    label: 'json_unquote',
    insertText: 'json_unquote()',
    documentation: 'Unquote JSON value'
  },
  {
    label: 'json_valid',
    insertText: 'json_valid()',
    documentation: 'Whether JSON value is valid'
  },
  {
    label: 'json_value',
    insertText: 'json_value()',
    documentation:
      'Extract value from JSON document at location pointed to by path provided; return this value as VARCHAR(512) or specified type'
  },
  {
    label: 'lag',
    insertText: 'lag()',
    documentation:
      'Value of argument from row lagging current row within partition'
  },
  {
    label: 'last_day',
    insertText: 'last_day $1',
    documentation: 'Return the last day of the month for the argument'
  },
  {
    label: 'last_insert_id',
    insertText: 'last_insert_id()',
    documentation: 'Value of the AUTOINCREMENT column for the last INSERT'
  },
  {
    label: 'last_value',
    insertText: 'last_value()',
    documentation: 'Value of argument from last row of window frame'
  },
  {
    label: 'lcase',
    insertText: 'lcase()',
    documentation: 'Synonym for LOWER()'
  },
  {
    label: 'lead',
    insertText: 'lead()',
    documentation:
      'Value of argument from row leading current row within partition'
  },
  {
    label: 'least',
    insertText: 'least()',
    documentation: 'Return the smallest argument'
  },
  {
    label: 'left',
    insertText: 'left()',
    documentation: 'Return the leftmost number of characters as specified'
  },
  {
    label: 'length',
    insertText: 'length()',
    documentation: 'Return the length of a string in bytes'
  },
  {
    label: 'like',
    insertText: 'like $1',
    documentation: 'Simple pattern matching'
  },
  {
    label: 'linestring',
    insertText: 'linestring()',
    documentation: 'Construct LineString from Point values'
  },
  {
    label: 'ln',
    insertText: 'ln()',
    documentation: 'Return the natural logarithm of the argument'
  },
  {
    label: 'load_file',
    insertText: 'load_file()',
    documentation: 'Load the named file'
  },
  {
    label: 'localtime',
    insertText: 'localtime()',
    documentation: 'Synonym for NOW()'
  },
  {
    label: 'localtimestamp',
    insertText: 'localtimestamp $1',
    documentation: 'Synonym for NOW()'
  },
  {
    label: 'locate',
    insertText: 'locate()',
    documentation: 'Return the position of the first occurrence of a substring'
  },
  {
    label: 'log',
    insertText: 'log()',
    documentation: 'Return the natural logarithm of the first argument'
  },
  {
    label: 'log10',
    insertText: 'log10()',
    documentation: 'Return the base-10 logarithm of the argument'
  },
  {
    label: 'log2',
    insertText: 'log2()',
    documentation: 'Return the base-2 logarithm of the argument'
  },
  {
    label: 'lower',
    insertText: 'lower()',
    documentation: 'Return the argument in lowercase'
  },
  {
    label: 'lpad',
    insertText: 'lpad()',
    documentation:
      'Return the string argument, left-padded with the specified string'
  },
  {
    label: 'ltrim',
    insertText: 'ltrim()',
    documentation: 'Remove leading spaces'
  },
  {
    label: 'make_set',
    insertText: 'make_set()',
    documentation:
      'Return a set of comma-separated strings that have the corresponding bit in bits set'
  },
  {
    label: 'makedate',
    insertText: 'makedate()',
    documentation: 'Create a date from the year and day of year'
  },
  {
    label: 'maketime',
    insertText: 'maketime()',
    documentation: 'Create time from hour, minute, second'
  },
  {
    label: 'master_pos_wait',
    insertText: 'master_pos_wait()',
    documentation:
      'Block until the replica has read and applied all updates up to the specified position'
  },
  {
    label: 'match',
    insertText: 'match()',
    documentation: 'Perform full-text search'
  },
  {
    label: 'max',
    insertText: 'max()',
    documentation: 'Return the maximum value'
  },
  {
    label: 'mbrcontains',
    insertText: 'mbrcontains()',
    documentation: 'Whether MBR of one geometry contains MBR of another'
  },
  {
    label: 'mbrcoveredby',
    insertText: 'mbrcoveredby()',
    documentation: 'Whether one MBR is covered by another'
  },
  {
    label: 'mbrcovers',
    insertText: 'mbrcovers()',
    documentation: 'Whether one MBR covers another'
  },
  {
    label: 'mbrdisjoint',
    insertText: 'mbrdisjoint()',
    documentation: 'Whether MBRs of two geometries are disjoint'
  },
  {
    label: 'mbrequals',
    insertText: 'mbrequals()',
    documentation: 'Whether MBRs of two geometries are equal'
  },
  {
    label: 'mbrintersects',
    insertText: 'mbrintersects()',
    documentation: 'Whether MBRs of two geometries intersect'
  },
  {
    label: 'mbroverlaps',
    insertText: 'mbroverlaps()',
    documentation: 'Whether MBRs of two geometries overlap'
  },
  {
    label: 'mbrtouches',
    insertText: 'mbrtouches()',
    documentation: 'Whether MBRs of two geometries touch'
  },
  {
    label: 'mbrwithin',
    insertText: 'mbrwithin()',
    documentation: 'Whether one MBR is within MBR of another'
  },
  {
    label: 'md5',
    insertText: 'md5()',
    documentation: 'Calculate MD5 checksum'
  },
  {
    label: 'member of',
    insertText: 'member of()',
    documentation:
      'Returns true (1) if first operand matches any element of JSON array passed as second operand, otherwise returns false (0)'
  },
  {
    label: 'microsecond',
    insertText: 'microsecond()',
    documentation: 'Return the microseconds from argument'
  },
  {
    label: 'mid',
    insertText: 'mid()',
    documentation: 'Return a substring starting from the specified position'
  },
  {
    label: 'min',
    insertText: 'min()',
    documentation: 'Return the minimum value'
  },
  {
    label: 'minute',
    insertText: 'minute()',
    documentation: 'Return the minute from the argument'
  },
  {
    label: 'mod',
    insertText: 'mod()',
    documentation: 'Return the remainder'
  },
  {
    label: 'month',
    insertText: 'month()',
    documentation: 'Return the month from the date passed'
  },
  {
    label: 'monthname',
    insertText: 'monthname()',
    documentation: 'Return the name of the month'
  },
  {
    label: 'multilinestring',
    insertText: 'multilinestring()',
    documentation: 'Construct MultiLineString from LineString arguments'
  },
  {
    label: 'multipoint',
    insertText: 'multipoint()',
    documentation: 'Construct MultiPoint from Point arguments'
  },
  {
    label: 'multipolygon',
    insertText: 'multipolygon()',
    documentation: 'Construct MultiPolygon from Polygon arguments'
  },
  {
    label: 'name_const',
    insertText: 'name_const()',
    documentation: 'Cause the column to have the given name'
  },
  {
    label: 'not',
    insertText: 'not $1',
    documentation: 'Negates a value'
  },
  {
    label: 'not between ... and ...',
    insertText: 'not between ... and ... $1',
    documentation: 'Whether a value is not within a range of values'
  },
  {
    label: 'not in',
    insertText: 'not in()',
    documentation: 'Whether a value is not within a set of values'
  },
  {
    label: 'not like',
    insertText: 'not like $1',
    documentation: 'Negation of simple pattern matching'
  },
  {
    label: 'not regexp',
    insertText: 'not regexp $1',
    documentation: 'Negation of REGEXP'
  },
  {
    label: 'now',
    insertText: 'now()',
    documentation: 'Return the current date and time'
  },
  {
    label: 'nth_value',
    insertText: 'nth_value()',
    documentation: 'Value of argument from Nth row of window frame'
  },
  {
    label: 'ntile',
    insertText: 'ntile()',
    documentation: 'Bucket number of current row within its partition'
  },
  {
    label: 'nullif',
    insertText: 'nullif()',
    documentation: 'Return NULL if expr1 = expr2, otherwise return expr1'
  },
  {
    label: 'oct',
    insertText: 'oct()',
    documentation: 'Return a string containing octal representation of a number'
  },
  {
    label: 'octet_length',
    insertText: 'octet_length()',
    documentation: 'Synonym for LENGTH()'
  },
  {
    label: 'or',
    insertText: 'or $1',
    documentation: ''
  },
  {
    label: 'ord',
    insertText: 'ord()',
    documentation:
      'Return character code for leftmost character of the argument'
  },
  {
    label: 'password',
    insertText: 'password()',
    documentation: 'Calculate and return a password string'
  },
  {
    label: 'period_add',
    insertText: 'period_add()',
    documentation: 'Add a number of months to a period'
  },
  {
    label: 'period_diff',
    insertText: 'period_diff()',
    documentation: 'Return the number of months between periods'
  },
  {
    label: 'percent_rank',
    insertText: 'percent_rank()',
    documentation: 'Percentage rank value'
  },
  {
    label: 'pi',
    insertText: 'pi()',
    documentation: 'Return the value of pi'
  },
  {
    label: 'point',
    insertText: 'point()',
    documentation: 'Construct Point from coordinates'
  },
  {
    label: 'polygon',
    insertText: 'polygon()',
    documentation: 'Construct Polygon from LineString arguments'
  },
  {
    label: 'position',
    insertText: 'position()',
    documentation: 'Synonym for LOCATE()'
  },
  {
    label: 'pow',
    insertText: 'pow()',
    documentation: 'Return the argument raised to the specified power'
  },
  {
    label: 'power',
    insertText: 'power()',
    documentation: 'Return the argument raised to the specified power'
  },
  {
    label: 'ps_current_thread_id',
    insertText: 'ps_current_thread_id()',
    documentation: 'Performance Schema thread ID for current thread'
  },
  {
    label: 'ps_thread_id',
    insertText: 'ps_thread_id()',
    documentation: 'Performance Schema thread ID for given thread ID'
  },
  {
    label: 'quarter',
    insertText: 'quarter()',
    documentation: 'Return the quarter from a date argument'
  },
  {
    label: 'quote',
    insertText: 'quote()',
    documentation: 'Escape the argument for use in an SQL statement'
  },
  {
    label: 'radians',
    insertText: 'radians()',
    documentation: 'Convert degrees to radians'
  },
  {
    label: 'rand',
    insertText: 'rand()',
    documentation: 'Return a random floating-point value'
  },
  {
    label: 'random_bytes',
    insertText: 'random_bytes()',
    documentation: 'Return a random byte vector'
  },
  {
    label: 'rank',
    insertText: 'rank()',
    documentation: 'Rank of current row within its partition, with gaps'
  },
  {
    label: 'regexp',
    insertText: 'regexp $1',
    documentation: 'Whether string matches regular expression'
  },
  {
    label: 'regexp_instr',
    insertText: 'regexp_instr()',
    documentation: 'Starting index of substring matching regular expression'
  },
  {
    label: 'regexp_like',
    insertText: 'regexp_like()',
    documentation: 'Whether string matches regular expression'
  },
  {
    label: 'regexp_replace',
    insertText: 'regexp_replace()',
    documentation:
      'Replace occurrences of substring matching regular expression'
  },
  {
    label: 'regexp_substr',
    insertText: 'regexp_substr()',
    documentation: 'Return substring matching regular expression'
  },
  {
    label: 'release_all_locks',
    insertText: 'release_all_locks()',
    documentation: 'Release all current named locks'
  },
  {
    label: 'release_lock',
    insertText: 'release_lock()',
    documentation: 'Release the named lock'
  },
  {
    label: 'repeat',
    insertText: 'repeat()',
    documentation: 'Repeat a string the specified number of times'
  },
  {
    label: 'replace',
    insertText: 'replace()',
    documentation: 'Replace occurrences of a specified string'
  },
  {
    label: 'reverse',
    insertText: 'reverse()',
    documentation: 'Reverse the characters of a string'
  },
  {
    label: 'right',
    insertText: 'right()',
    documentation: 'Return the specified rightmost number of characters'
  },
  {
    label: 'rlike',
    insertText: 'rlike $1',
    documentation: 'Synonym for REGEXP'
  },
  {
    label: 'roles_graphml',
    insertText: 'roles_graphml()',
    documentation: 'Return a GraphML document representing roles and grantees'
  },
  {
    label: 'round',
    insertText: 'round()',
    documentation: 'Round the argument'
  },
  {
    label: 'row_count',
    insertText: 'row_count()',
    documentation: 'The number of rows updated'
  },
  {
    label: 'row_number',
    insertText: 'row_number()',
    documentation: 'Number of current row within its partition'
  },
  {
    label: 'rpad',
    insertText: 'rpad()',
    documentation: 'Append string the specified number of times'
  },
  {
    label: 'rtrim',
    insertText: 'rtrim()',
    documentation: 'Remove trailing spaces'
  },
  {
    label: 'schema',
    insertText: 'schema()',
    documentation: 'Synonym for DATABASE()'
  },
  {
    label: 'sec_to_time',
    insertText: 'sec_to_time()',
    documentation: "Converts seconds to 'HH:MM:SS' format"
  },
  {
    label: 'second',
    insertText: 'second()',
    documentation: 'Return the second (0-59)'
  },
  {
    label: 'session_user',
    insertText: 'session_user()',
    documentation: 'Synonym for USER()'
  },
  {
    label: 'sha1',
    insertText: 'sha1()',
    documentation: 'Calculate an SHA-1 160-bit checksum'
  },
  {
    label: 'sha2',
    insertText: 'sha2()',
    documentation: 'Calculate an SHA-2 checksum'
  },
  {
    label: 'sign',
    insertText: 'sign()',
    documentation: 'Return the sign of the argument'
  },
  {
    label: 'sin',
    insertText: 'sin()',
    documentation: 'Return the sine of the argument'
  },
  {
    label: 'sleep',
    insertText: 'sleep()',
    documentation: 'Sleep for a number of seconds'
  },
  {
    label: 'soundex',
    insertText: 'soundex()',
    documentation: 'Return a soundex string'
  },
  {
    label: 'sounds like',
    insertText: 'sounds like $1',
    documentation: 'Compare sounds'
  },
  {
    label: 'space',
    insertText: 'space()',
    documentation: 'Return a string of the specified number of spaces'
  },
  {
    label: 'sqrt',
    insertText: 'sqrt()',
    documentation: 'Return the square root of the argument'
  },
  {
    label: 'st_area',
    insertText: 'st_area()',
    documentation: 'Return Polygon or MultiPolygon area'
  },
  {
    label: 'st_asbinary',
    insertText: 'st_asbinary()',
    documentation: 'Convert from internal geometry format to WKB'
  },
  {
    label: 'st_asgeojson',
    insertText: 'st_asgeojson()',
    documentation: 'Generate GeoJSON object from geometry'
  },
  {
    label: 'st_astext',
    insertText: 'st_astext()',
    documentation: 'Convert from internal geometry format to WKT'
  },
  {
    label: 'st_buffer',
    insertText: 'st_buffer()',
    documentation:
      'Return geometry of points within given distance from geometry'
  },
  {
    label: 'st_buffer_strategy',
    insertText: 'st_buffer_strategy()',
    documentation: 'Create buffer strategy object'
  },
  {
    label: 'st_centroid',
    insertText: 'st_centroid()',
    documentation: 'Return centroid as a point'
  },
  {
    label: 'st_collect',
    insertText: 'st_collect()',
    documentation: 'Return geometry collection from geometries'
  },
  {
    label: 'st_contains',
    insertText: 'st_contains()',
    documentation: 'Whether one geometry contains another'
  },
  {
    label: 'st_convexhull',
    insertText: 'st_convexhull()',
    documentation: 'Return convex hull of geometry'
  },
  {
    label: 'st_crosses',
    insertText: 'st_crosses()',
    documentation: 'Whether one geometry crosses another'
  },
  {
    label: 'st_difference',
    insertText: 'st_difference()',
    documentation: 'Return point set difference of two geometries'
  },
  {
    label: 'st_dimension',
    insertText: 'st_dimension()',
    documentation: 'Dimension of geometry'
  },
  {
    label: 'st_disjoint',
    insertText: 'st_disjoint()',
    documentation: 'Whether one geometry is disjoint from another'
  },
  {
    label: 'st_distance',
    insertText: 'st_distance()',
    documentation: 'The distance of one geometry from another'
  },
  {
    label: 'st_distance_sphere',
    insertText: 'st_distance_sphere()',
    documentation: 'Return distance on sphere between two geometries'
  },
  {
    label: 'st_endpoint',
    insertText: 'st_endpoint()',
    documentation: 'End Point of LineString'
  },
  {
    label: 'st_envelope',
    insertText: 'st_envelope()',
    documentation: 'Bounding box of geometry'
  },
  {
    label: 'st_equals',
    insertText: 'st_equals()',
    documentation: 'Whether one geometry is equal to another'
  },
  {
    label: 'st_exteriorring',
    insertText: 'st_exteriorring()',
    documentation: 'Return exterior ring of Polygon'
  },
  {
    label: 'st_frechetdistance',
    insertText: 'st_frechetdistance()',
    documentation: 'Return Fréchet distance between two geometries'
  },
  {
    label: 'st_geohash',
    insertText: 'st_geohash()',
    documentation: 'Produce a geohash value'
  },
  {
    label: 'st_geomfromgeojson',
    insertText: 'st_geomfromgeojson()',
    documentation: 'Generate geometry from GeoJSON object'
  },
  {
    label: 'st_geomfromtext',
    insertText: 'st_geomfromtext()',
    documentation: 'Construct geometry from WKT'
  },
  {
    label: 'st_geomfromwkb',
    insertText: 'st_geomfromwkb()',
    documentation: 'Construct geometry from WKB'
  },
  {
    label: 'st_geometryn',
    insertText: 'st_geometryn()',
    documentation: 'Return N-th geometry from geometry collection'
  },
  {
    label: 'st_geometrytype',
    insertText: 'st_geometrytype()',
    documentation: 'Name of geometry type'
  },
  {
    label: 'st_hausdorffdistance',
    insertText: 'st_hausdorffdistance()',
    documentation: 'Return Hausdorff distance between two geometries'
  },
  {
    label: 'st_interiorringn',
    insertText: 'st_interiorringn()',
    documentation: 'Return N-th interior ring of Polygon'
  },
  {
    label: 'st_intersection',
    insertText: 'st_intersection()',
    documentation: 'Return point set intersection of two geometries'
  },
  {
    label: 'st_intersects',
    insertText: 'st_intersects()',
    documentation: 'Whether one geometry intersects another'
  },
  {
    label: 'st_isclosed',
    insertText: 'st_isclosed()',
    documentation: 'Whether a geometry is closed and simple'
  },
  {
    label: 'st_isempty',
    insertText: 'st_isempty()',
    documentation: 'Whether a geometry is the empty set'
  },
  {
    label: 'st_issimple',
    insertText: 'st_issimple()',
    documentation: 'Whether a geometry is simple'
  },
  {
    label: 'st_isvalid',
    insertText: 'st_isvalid()',
    documentation: 'Whether a geometry is valid'
  },
  {
    label: 'st_latfromgeohash',
    insertText: 'st_latfromgeohash()',
    documentation: 'Return latitude from geohash value'
  },
  {
    label: 'st_length',
    insertText: 'st_length()',
    documentation: 'Return length of LineString'
  },
  {
    label: 'st_linefromtext',
    insertText: 'st_linefromtext()',
    documentation: 'Construct LineString from WKT'
  },
  {
    label: 'st_linefromwkb',
    insertText: 'st_linefromwkb()',
    documentation: 'Construct LineString from WKB'
  },
  {
    label: 'st_longfromgeohash',
    insertText: 'st_longfromgeohash()',
    documentation: 'Return longitude from geohash value'
  },
  {
    label: 'st_makeenvelope',
    insertText: 'st_makeenvelope()',
    documentation: 'Create bounding box from points'
  },
  {
    label: 'st_mlinefromtext',
    insertText: 'st_mlinefromtext()',
    documentation: 'Construct MultiLineString from WKT'
  },
  {
    label: 'st_mlinefromwkb',
    insertText: 'st_mlinefromwkb()',
    documentation: 'Construct MultiLineString from WKB'
  },
  {
    label: 'st_mpointfromtext',
    insertText: 'st_mpointfromtext()',
    documentation: 'Construct MultiPoint from WKT'
  },
  {
    label: 'st_mpointfromwkb',
    insertText: 'st_mpointfromwkb()',
    documentation: 'Construct MultiPoint from WKB'
  },
  {
    label: 'st_mpolyfromtext',
    insertText: 'st_mpolyfromtext()',
    documentation: 'Construct MultiPolygon from WKT'
  },
  {
    label: 'st_mpolyfromwkb',
    insertText: 'st_mpolyfromwkb()',
    documentation: 'Construct MultiPolygon from WKB'
  },
  {
    label: 'st_numgeometries',
    insertText: 'st_numgeometries()',
    documentation: 'Number of geometries in geometry collection'
  },
  {
    label: 'st_numinteriorring',
    insertText: 'st_numinteriorring()',
    documentation: 'Number of interior rings in Polygon'
  },
  {
    label: 'st_numpoints',
    insertText: 'st_numpoints()',
    documentation: 'Number of points in LineString'
  },
  {
    label: 'st_overlaps',
    insertText: 'st_overlaps()',
    documentation: 'Whether one geometry overlaps another'
  },
  {
    label: 'st_pointfromgeohash',
    insertText: 'st_pointfromgeohash()',
    documentation: 'Return Point from geohash value'
  },
  {
    label: 'st_pointfromtext',
    insertText: 'st_pointfromtext()',
    documentation: 'Construct Point from WKT'
  },
  {
    label: 'st_pointfromwkb',
    insertText: 'st_pointfromwkb()',
    documentation: 'Construct Point from WKB'
  },
  {
    label: 'st_pointn',
    insertText: 'st_pointn()',
    documentation: 'N-th point from LineString'
  },
  {
    label: 'st_polyfromtext',
    insertText: 'st_polyfromtext()',
    documentation: 'Construct Polygon from WKT'
  },
  {
    label: 'st_polyfromwkb',
    insertText: 'st_polyfromwkb()',
    documentation: 'Construct Polygon from WKB'
  },
  {
    label: 'st_simplify',
    insertText: 'st_simplify()',
    documentation: 'Return simplified geometry'
  },
  {
    label: 'st_srid',
    insertText: 'st_srid()',
    documentation: 'Return spatial reference system ID for geometry'
  },
  {
    label: 'st_startpoint',
    insertText: 'st_startpoint()',
    documentation: 'Start Point of LineString'
  },
  {
    label: 'st_swapxy',
    insertText: 'st_swapxy()',
    documentation: 'Swap X and Y coordinates of geometry'
  },
  {
    label: 'st_symdifference',
    insertText: 'st_symdifference()',
    documentation: 'Return point set symmetric difference of two geometries'
  },
  {
    label: 'st_touches',
    insertText: 'st_touches()',
    documentation: 'Whether one geometry touches another'
  },
  {
    label: 'st_transform',
    insertText: 'st_transform()',
    documentation: 'Return transformed geometry'
  },
  {
    label: 'st_union',
    insertText: 'st_union()',
    documentation: 'Return point set union of two geometries'
  },
  {
    label: 'st_validate',
    insertText: 'st_validate()',
    documentation: 'Return validated geometry'
  },
  {
    label: 'st_within',
    insertText: 'st_within()',
    documentation: 'Whether one geometry is within another'
  },
  {
    label: 'st_x',
    insertText: 'st_x()',
    documentation: 'Return X coordinate of Point'
  },
  {
    label: 'st_y',
    insertText: 'st_y()',
    documentation: 'Return Y coordinate of Point'
  },
  {
    label: 'std',
    insertText: 'std()',
    documentation: 'Return the population standard deviation'
  },
  {
    label: 'stddev',
    insertText: 'stddev()',
    documentation: 'Return the population standard deviation'
  },
  {
    label: 'stddev_pop',
    insertText: 'stddev_pop()',
    documentation: 'Return the population standard deviation'
  },
  {
    label: 'stddev_samp',
    insertText: 'stddev_samp()',
    documentation: 'Return the sample standard deviation'
  },
  {
    label: 'str_to_date',
    insertText: 'str_to_date()',
    documentation: 'Convert a string to a date'
  },
  {
    label: 'strcmp',
    insertText: 'strcmp()',
    documentation: 'Compare two strings'
  },
  {
    label: 'subdate',
    insertText: 'subdate()',
    documentation: 'Synonym for DATE_SUB() when invoked with three arguments'
  },
  {
    label: 'substr',
    insertText: 'substr()',
    documentation: 'Return the substring as specified'
  },
  {
    label: 'substring',
    insertText: 'substring()',
    documentation: 'Return the substring as specified'
  },
  {
    label: 'substring_index',
    insertText: 'substring_index()',
    documentation:
      'Return a substring from a string before the specified number of occurrences of the delimiter'
  },
  {
    label: 'sum',
    insertText: 'sum()',
    documentation: 'Return the sum'
  },
  {
    label: 'sysdate',
    insertText: 'sysdate()',
    documentation: 'Return the time at which the function executes'
  },
  {
    label: 'system_user',
    insertText: 'system_user()',
    documentation: 'Synonym for USER()'
  },
  {
    label: 'tan',
    insertText: 'tan()',
    documentation: 'Return the tangent of the argument'
  },
  {
    label: 'time',
    insertText: 'time()',
    documentation: 'Extract the time portion of the expression passed'
  },
  {
    label: 'time_format',
    insertText: 'time_format()',
    documentation: 'Format as time'
  },
  {
    label: 'time_to_sec',
    insertText: 'time_to_sec()',
    documentation: 'Return the argument converted to seconds'
  },
  {
    label: 'timediff',
    insertText: 'timediff()',
    documentation: 'Subtract time'
  },
  {
    label: 'timestamp',
    insertText: 'timestamp()',
    documentation:
      'With a single argument, this function returns the date or datetime expression; with two arguments, the sum of the arguments'
  },
  {
    label: 'timestampadd',
    insertText: 'timestampadd()',
    documentation: 'Add an interval to a datetime expression'
  },
  {
    label: 'timestampdiff',
    insertText: 'timestampdiff()',
    documentation: 'Subtract an interval from a datetime expression'
  },
  {
    label: 'to_base64',
    insertText: 'to_base64()',
    documentation: 'Convert argument to base64 encoded string and return result'
  },
  {
    label: 'to_days',
    insertText: 'to_days()',
    documentation: 'Return the date argument converted to days'
  },
  {
    label: 'to_seconds',
    insertText: 'to_seconds()',
    documentation:
      'Return the date or datetime argument converted to seconds since Year 0'
  },
  {
    label: 'trim',
    insertText: 'trim()',
    documentation: 'Remove leading and trailing spaces'
  },
  {
    label: 'truncate',
    insertText: 'truncate()',
    documentation: 'Truncate to specified number of decimal places'
  },
  {
    label: 'ucase',
    insertText: 'ucase()',
    documentation: 'Synonym for UPPER()'
  },
  {
    label: 'uncompress',
    insertText: 'uncompress()',
    documentation: 'Uncompress a string compressed'
  },
  {
    label: 'uncompressed_length',
    insertText: 'uncompressed_length()',
    documentation: 'Return the length of a string before compression'
  },
  {
    label: 'unhex',
    insertText: 'unhex()',
    documentation: 'Convert each pair of hexadecimal digits to a character'
  },
  {
    label: 'unix_timestamp',
    insertText: 'unix_timestamp()',
    documentation: 'Return a Unix timestamp'
  },
  {
    label: 'updatexml',
    insertText: 'updatexml()',
    documentation: 'Return replaced XML fragment'
  },
  {
    label: 'upper',
    insertText: 'upper()',
    documentation: 'Convert to uppercase'
  },
  {
    label: 'user',
    insertText: 'user()',
    documentation: 'The user name and host name provided by the client'
  },
  {
    label: 'utc_date',
    insertText: 'utc_date()',
    documentation: 'Return the current UTC date'
  },
  {
    label: 'utc_time',
    insertText: 'utc_time()',
    documentation: 'Return the current UTC time'
  },
  {
    label: 'utc_timestamp',
    insertText: 'utc_timestamp()',
    documentation: 'Return the current UTC date and time'
  },
  {
    label: 'uuid',
    insertText: 'uuid()',
    documentation: 'Return a Universal Unique Identifier (UUID)'
  },
  {
    label: 'uuid_short',
    insertText: 'uuid_short()',
    documentation: 'Return an integer-valued universal identifier'
  },
  {
    label: 'uuid_to_bin',
    insertText: 'uuid_to_bin()',
    documentation: 'Convert string UUID to binary'
  },
  {
    label: 'validate_password_strength',
    insertText: 'validate_password_strength()',
    documentation: 'Determine strength of password'
  },
  {
    label: 'values',
    insertText: 'values()',
    documentation: 'Define the values to be used during an INSERT'
  },
  {
    label: 'var_pop',
    insertText: 'var_pop()',
    documentation: 'Return the population standard variance'
  },
  {
    label: 'var_samp',
    insertText: 'var_samp()',
    documentation: 'Return the sample variance'
  },
  {
    label: 'variance',
    insertText: 'variance()',
    documentation: 'Return the population standard variance'
  },
  {
    label: 'version',
    insertText: 'version()',
    documentation: 'Return a string that indicates the MySQL server version'
  },
  {
    label: 'wait_for_executed_gtid_set',
    insertText: 'wait_for_executed_gtid_set()',
    documentation: 'Wait until the given GTIDs have executed on the replica'
  },
  {
    label: 'week',
    insertText: 'week()',
    documentation: 'Return the week number'
  },
  {
    label: 'weekday',
    insertText: 'weekday()',
    documentation: 'Return the weekday index'
  },
  {
    label: 'weekofyear',
    insertText: 'weekofyear()',
    documentation: 'Return the calendar week of the date (1-53)'
  },
  {
    label: 'weight_string',
    insertText: 'weight_string()',
    documentation: 'Return the weight string for a string'
  },
  {
    label: 'xor',
    insertText: 'xor $1',
    documentation: 'Logical XOR'
  },
  {
    label: 'year',
    insertText: 'year()',
    documentation: 'Return the year'
  },
  {
    label: 'yearweek',
    insertText: 'yearweek()',
    documentation: 'Return the year and week'
  },
  {
    label: '~',
    insertText: '~',
    documentation: 'Bitwise inversion'
  }
]
