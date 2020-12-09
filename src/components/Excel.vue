<template>
  <div>
    <b-button v-b-modal.file variant="white">
      <b-icon variant="wb" icon="file-spreadsheet-fill"></b-icon>
    </b-button>

    <b-modal
      id="file"
      title="Open File"
      hide-footer
      centered
      no-close-on-backdrop
    >
      <label for="ex" class="btn btn-block btn-wb">Upload Excel File</label>
      <input
        ref="excel"
        type="file"
        id="ex"
        hidden
        @change="HandleFileUpload"
      />
      <b-table striped hover class="text-center" :items="sheetnames">
        <template #head(check)>
          <span>Include</span>
        </template>
        <template #cell(check)="data">
          <b-form-checkbox
            v-model="sheetnames[data.index].check"
            :value="true"
            :unchecked-value="false"
          >
          </b-form-checkbox>
        </template>
      </b-table>
      <button
        v-if="sheetnames.length > 0"
        class="btn btn-wb btn-block"
        type="button"
        @click="load"
      >
        Load Table
      </button>
    </b-modal>
  </div>
</template>
<script>
import XLSX from "xlsx";
export default {
  name: "excel",
  data: function () {
    return {
      sheetnames: [],
      sheets: [],
      namecol: null,
      email: null,
    };
  },
  methods: {
    HandleFileUpload(evt) {
      if (this.$refs.excel.files.length > 0) {
        var selectedFile = evt.target.files[0];
        var reader = new FileReader();
        reader.onload = (event) => {
          var data = event.target.result;
          var workbook = XLSX.read(data, {
            type: "binary",
          });
          this.BuildSheetsList(workbook.SheetNames);
          // var XL_row_object = XLSX.utils.sheet_to_row_object_array(
          //   workbook.Sheets["Sheet1"]
          // );
          // var json_object = JSON.stringify(XL_row_object);
          // console.log(JSON.parse(json_object));
          this.sheets = workbook.Sheets;
        };
        reader.onerror = function (event) {
          console.error(
            "File could not be read! Code " + event.target.error.code
          );
        };
        reader.readAsBinaryString(selectedFile);
      }
    },
    BuildSheetsList(data) {
      this.sheetnames = [];
      for (var i = 0; i < data.length; i++) {
        this.sheetnames.push({ check: false, name: data[i] });
      }
    },
    load() {
      var load_data = [];
      for (var i = 0; i < this.sheetnames.length; i++) {
        if (this.sheetnames[i].check) {
          var data = XLSX.utils.sheet_to_json(
            this.sheets[this.sheetnames[i].name]
          );
          for (var j = 0; j < data.length; j++) {
            load_data.push({ name: data[j].Name, email: data[j].Email });
          }
        }
      }

      this.$emit("load", load_data);
      this.$bvModal.hide("file");
    },
  },
};
</script>