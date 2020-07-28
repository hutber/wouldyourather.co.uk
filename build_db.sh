#!/bin/bash

import_query="\copy production_status.bom(task_number,task_title,sap_document_id,version_checked,source,casualty_vmi_references,position,discarded_or_wearing,bom_state,replacement_rate,cosima_code,vmi_description,equinox_description,quantity_per_assembly_commented,quantity_per_assembly,quantity_per_train_commented,quantity_per_train,quantity_as_list,vmi_quantity_correct_info,stock_code,a2v_number,vmi_data_source,part_number_data_source,job_status,part_type) FROM 'csv/billofMaterials.csv' CSV HEADER"

: ${dbPaths:=db/*.sql}

if [[ $3 = "local" ]]; then
  dbPaths=$(find db/*.sql db/localSql/*.sql)
fi

if [ -n "$1" ] && [ -n "$2" ];
then
    cat $dbPaths | psql -d $1 -h localhost --username=$2;
    psql -d $1 -h localhost --username=$2 -c "$import_query";
else
    cat $dbPaths | psql -d depotdb -h localhost;
    psql -d depotdb -h localhost -c "$import_query";
fi

