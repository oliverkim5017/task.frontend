<template>
  <div>
    <el-tree
        :data="deptTree"
        :props="defaultProps"
        node-key="id"
        :expand-on-click-node="false"
        @node-click="handleNodeClick"
        default-expand-all
    >
    </el-tree>
    <el-container style="margin-top: 60px">
      <el-button @click="addDept">添加部门</el-button>
      <el-button @click="deleteDept">删除部门</el-button>
    </el-container>


    <el-dialog v-model="dialog">
      <span slot="title">{{ editing ? '编辑部门' : '添加部门' }}</span>
      <el-form>
        <el-form-item label="部门名称">
          <el-input v-model="dept.name"></el-input>
        </el-form-item>
        <el-form-item label="上级部门">
          <el-select v-model="dept.parentId" placeholder="选择上级部门">
            <el-option
                v-for="item in hierarchicalDepartments"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取消</el-button>
        <el-button type="primary" @click="handleEdit">确定</el-button>
      </span>
    </el-dialog>
  </div>

  <el-dialog
      title="删除部门"
      v-model="delDialog"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
  >
    <el-select v-model="selectedId" placeholder="请选择部门">
      <el-option
          v-for="item in hierarchicalDepartments"
          :key="item.id"
          :label="item.name"
          :value="item.id"
      ></el-option>
    </el-select>
    <span slot="footer" class="dialog-footer">
      <el-button @click="delDialog = false">取 消</el-button>
      <el-button type="primary" @click="onConfirm">确 定</el-button>
    </span>
  </el-dialog>


</template>


<script>
import api from "../utils/api.js";

export default {
  name: 'Department',
  data() {
    return {
      deptTree: [],
      flatDeptTree: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      dept: {
        name: '',
        parentId: null,
      },
      dialog: false,
      editing: false,
      hierarchicalDepartments: [],
      selectedId: 0,
      delDialog: false
    };
  },
  methods: {
    loadDeptData() {
      api.getDepartments().then(response => {
        this.deptTree = this.transformToTreeData(response.data.data);
        this.flatDeptTree = response.data.data;
        this.hierarchicalDepartments = this.buildHierarchy(response.data.data);
      });
    },
    transformToTreeData(deptData) {
      let tree = [], mapping = {};
      deptData.forEach(dept => {
        mapping[dept.id] = {...dept, children: []};
      });
      deptData.forEach(dept => {
        let parent = mapping[dept.parentId];
        if (parent) {
          parent.children.push(mapping[dept.id]);
        } else {
          tree.push(mapping[dept.id]);
        }
      });
      return tree;
    },
    addDept() {
      this.editing = false;
      this.dept = { name: '', parentId: null };
      this.dialog = true;
    },
    editDept(node) {
      this.editing = true;
      this.dept = {...node.data};
      this.dialog = true;
    },
    deleteDept() {
      this.delDialog = true
    },
    onConfirm() {
      api.delDept(this.selectedId).then(() => {
        this.delDialog = false;
        this.selectedId = 0
        this.loadDeptData();
      });
    },
    handleNodeClick(node) {
      console.log('Node clicked', node);
    },
    handleEdit() {
      if (this.dept.name === '' || this.dept.name === undefined) {
        this.$message.error('部门名称不能为空');
        return;
      }
      api.saveOrUpdateDept(this.dept).then(response => {
        this.dialog = false;
        this.loadDeptData();
      });
    },
    buildHierarchy(departments) {

      console.log(departments)
      const departmentMap = {};
      departments.forEach(dept => {
        departmentMap[dept.id] = { ...dept, children: [] };
      });

      const tree = [];
      departments.forEach(dept => {
        if (dept.parentId) {
          departmentMap[dept.parentId].children.push(departmentMap[dept.id]);
        } else {
          tree.push(departmentMap[dept.id]);
        }
      });

      const flattenHierarchy = (node, prefix = '') => {
        const hierarchicalNode = { id: node.id, name: `${prefix}${node.name}` };
        return [
          hierarchicalNode,
          ...node.children.flatMap(child => flattenHierarchy(child, `${prefix}-`))
        ];
      };
      return tree.flatMap(root => flattenHierarchy(root));
    }
  },
  mounted() {
    this.loadDeptData();
  }
}
</script>

