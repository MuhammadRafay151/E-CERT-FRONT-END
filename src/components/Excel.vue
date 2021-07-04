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
      class="text-center"
    >
      <div class="btn-group btn-block">
        <label for="ex" class="btn btn-block btn-wb">Upload Excel File</label>
        <label
          class="btn btn-wb"
          v-b-tooltip.hover
          title="Remove file"
          v-on:click="unloadFile"
          v-if="sheetnames.length > 0"
        >
          X
        </label>
        <label
          class="btn btn-wb"
          v-on:click="downloadTemplate"
          v-b-tooltip.hover
          title="Download file template"
        >
          <b-icon font-scale="1.5" icon="arrow-down-circle-fill"></b-icon>
        </label>
      </div>
      <input
        ref="excel"
        type="file"
        id="ex"
        hidden
        @change="HandleFileUpload"
      />
      <b-table
        v-if="sheets"
        striped
        hover
        class="text-center"
        :items="sheetnames"
      >
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
      <sub
        class="text-danger mt-1 d-flex justify-content-center"
        v-if="InvaliFileType"
        >Invalid File type</sub
      >
    </b-modal>
  </div>
</template>
<script>
import XLSX from "xlsx";
export default {
  name: "excel",
  data: function () {
    return {
      InvaliFileType: false,
      sheetnames: [],
      sheets: null,
      namecol: null,
      email: null,
    };
  },
  methods: {
    HandleFileUpload(evt) {
      let AllowedTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      if (this.$refs.excel.files.length > 0) {
        this.InvaliFileType = false;
        if (!AllowedTypes.includes(evt.target.files[0].type)) {
          this.InvaliFileType = true;
          return;
        }
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
    downloadTemplate() {
      let template = document.createElement("a");
      template.href = "/files/Template.xlsx";
      template.target = "_blank";
      template.click();
    },
    unloadFile() {
      this.$refs.excel.value = "";
      this.sheets = null;
      this.$nextTick(() => {
        this.sheetnames = [];
      });
    },
  },
};
</script>