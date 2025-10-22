export default [
  {
    label: 'Query Block',
    prefix: 'query block',
    body: ['-- query: $1']
  },
  {
    label: 'select',
    prefix: 'select',
    body: ['select ${2:column1}, ${3:column2} from ${1:table_name};\n$4']
  },
  {
    label: 'drop-table',
    prefix: 'drop-table',
    body: ['drop table if exists ${1:table_name};\n$2']
  },
  {
    label: 'select-join',
    prefix: 'select-join',
    body: [
      'select ${8:column1} from ${1:table_name} ${2:t1}',
      '${3:left} join ${4:table2} ${5:t2} on ${2:t1}.${6:column1} = ${5:t2}.${7:column2};\n$9'
    ]
  },
  {
    label: 'select-order-by',
    prefix: 'select-order-by',
    body: [
      'select ${2:column1}, ${3:column2} from ${1:table_name} order by ${4:column1} ${5:desc};\n$6'
    ]
  },
  {
    label: 'insert',
    prefix: 'insert-into',
    body: [
      'insert into ${1:table_name} (${2:column1}, ${3:column2}) values (${4:value1}, ${5:value2});\n$6'
    ]
  },
  {
    label: 'replace-into-table',
    prefix: 'replace-into-table',
    body: [
      'replace into ${1:table_name} (${2:column1}, ${3:column2})',
      'values (${4:value1}, ${5:value2});\n$6'
    ]
  },
  {
    label: 'update',
    prefix: 'update',
    body: [
      'update ${1:table_name}',
      'set ${2:column1} = ${3:value1}',
      'where ${4:column2} = ${5:value2};\n$6'
    ]
  },
  {
    label: 'delete',
    prefix: 'delete',
    body: [
      'delete from ${1:table_name}',
      'where ${2:column1} = ${3:value1};\n$4'
    ]
  },
  {
    label: 'create-table',
    prefix: 'create-table',
    body: [
      'create table ${1:table_name} (',
      '\t${2:column1} ${3:int},',
      '\t${4:column2} ${5:int},',
      '\tprimary key (${2:column1})',
      ')',
      "COMMENT '${6:table_comment}';\n$7"
    ]
  },
  {
    label: 'create-table-as-select',
    prefix: 'create-table-as-select',
    body: [
      'create table ${1:table_name}',
      'as',
      'select ${2:column1}, ${3:column2}',
      'from ${4:source_table}',
      'where ${5:conditions};\n$6'
    ]
  },
  {
    label: 'create-table-partitioned-by-range',
    prefix: 'create-table-partitioned-by-range',
    body: [
      'create table ${1:table_name} (',
      '\t${2:column1} ${3:int},',
      '\t${4:column2} ${5:int},',
      '\tprimary key (${2:column1})',
      ')',
      'partition by range (${2:column1}) (',
      '\tpartition ${6:p0} values less than ($7)',
      ');\n$8'
    ]
  },
  {
    label: 'create-table-partitioned-by-list',
    prefix: 'create-table-partitioned-by-list',
    body: [
      'create table ${1:table_name} (',
      '\t${2:column1} ${3:int},',
      '\t${4:column2} ${5:int},',
      '\tprimary key (${2:column1})',
      ')',
      'partition by list (${2:column1}) (',
      '\tpartition ${6:p0} values in ($7)',
      ');\n$8'
    ]
  },
  {
    label: 'create-table-partitioned-by-hash',
    prefix: 'create-table-partitioned-by-hash',
    body: [
      'create table ${1:table_name} (',
      '\t${2:column1} ${3:int},',
      '\t${4:column2} ${5:int},',
      '\tprimary key (${2:column1})',
      ')',
      'partition by hash (${2:column1})',
      'partitions ${6:4};\n$7'
    ]
  },
  {
    label: 'create-table-partitioned-by-key',
    prefix: 'create-table-partitioned-by-key',
    body: [
      'create table ${1:table_name} (',
      '\t${2:column1} ${3:int},',
      '\t${4:column2} ${5:int},',
      '\tprimary key (${2:column1})',
      ')',
      'partition by key (${2:column1})',
      'partitions ${6:4};\n$7'
    ]
  },
  {
    label: 'alter-table-add-column',
    prefix: 'alter-table-add-column',
    body: [
      "ALTER TABLE ${1:table_name} ADD ${2:column_name} ${3:INT} COMMENT '${4:desc}';\n$5"
    ]
  },
  {
    label: 'alter-table-add-partition',
    prefix: 'alter-table-add-partition',
    body: ['alter table ${1:table_name} add partition (', '\t$2', ');\n$4']
  },
  {
    label: 'alter-table-add-index',
    prefix: 'alter-table-add-index',
    body: [
      'alter table ${1:table_name} add index ${2:index_name} (${3:column_name});\n$4'
    ]
  },
  {
    label: 'alter-table-add-primary-key',
    prefix: 'alter-table-add-primary-key',
    body: [
      'alter table ${1:table_name} add primary key (${2:column_name});\n$3'
    ]
  },
  {
    label: 'alter-table-add-constraint',
    prefix: 'alter-table-add-constraint',
    body: [
      'alter table ${1:table_name}',
      'add constraint ${2:constraint_name}',
      'foreign key (${3:foreign_column}) references ${4:ref_table} (${5:ref_column});\n$6'
    ]
  }
]
