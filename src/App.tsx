import {
  Button,
  Alert,
  Select,
  TableForm,
  ProTable,
} from "@terminus/nusi-slim";
import type { ProColumns, TableActionItem } from "@terminus/nusi-slim";

import {
  Checkbox,
  Input,
  Radio,
  InputNumber,
  DatePicker,
  TimePicker,
  Switch,
} from "antd";

interface DataType {
  id: string;
  createdAt: number;
  skuCode: string;
  skuName: string;
  stock: number;
}

const columns: ProColumns<DataType>[] = [
  {
    title: "ID",
    dataIndex: "id",
    copyable: true,
    width: 80,
  },
  {
    title: "变更时间",
    dataIndex: "createdAt",
    valueType: "date",
    width: 120,
  },
  {
    title: "物料编码",
    dataIndex: "skuCode",
    copyable: true,
    width: 120,
  },
  {
    title: "物料名称",
    dataIndex: "skuName",
    width: 120,
  },
  {
    title: "库存",
    dataIndex: "stock",
    width: 120,
    summary: true,
  },
];

const dataSource: DataType[] = [];
for (let i = 0; i < 500; ++i) {
  dataSource.push({
    id: (Math.random() * 100000000).toFixed(0),
    createdAt: Date.now() - (Math.random() * 100000000).toFixed(0),
    skuCode: "Upgraded: 56",
    skuName: `Item ${i}`,
    stock: (Math.random() * 100000).toFixed(0),
  });
}

export default function App() {
  return (
    <div>
      <Alert showIcon description={<div>hahahah</div>}></Alert>
      <hr />
      <Button customType="dropdown" overlay={<div>hahaha</div>}>ahhahah</Button>
      <hr />
      <Input></Input>
      <hr />
      <InputNumber></InputNumber>x
      <hr />
      <Switch></Switch>
      <hr />
      <Radio.Group>
        <Radio>aaa</Radio>
        <Radio>bbb</Radio>
      </Radio.Group>
      <hr />
      <Checkbox.Group>
        <Checkbox>aaa</Checkbox>
        <Checkbox>bbb</Checkbox>
      </Checkbox.Group>
      <hr />
      <Select
        options={[
          {
            value: "jack",
            label: "Jack",
          },
          {
            value: "lucy",
            label: "Lucy",
          },
        ]}
      ></Select>
      <hr />
      <DatePicker></DatePicker>
      <hr />
      <TimePicker></TimePicker>
      <hr />
      <ProTable<DataType>
        columns={columns}
        dataSource={dataSource}
        scroll={{ y: 500 }}
        pagination={{ pageSize: 20 }}
        rowSelection={{ type: "radio" }}
        actions={(actions) => {
          return [
            <Button key="button" type="primary">
              新建
            </Button>,
            <Button
              key="button"
              onClick={() => {
                actions.refresh();
              }}
            >
              刷新
            </Button>,
            <Button
              key="button"
              onClick={() => {
                actions.refresh(1000);
              }}
            >
              延时刷新
            </Button>,
            {
              name: "批量删除",
              isBatch: true,
              batchTip: "请选择要删除的数据",
              customType: "confirm",
              externalProps: {
                title: "确定要删除当前数据吗？",
                onConfirm: () => message.success("删除成功"),
              },
            },
            {
              name: "批量禁用",
              isBatch: true,
              onClick: () => message.success("禁用成功"),
            },
            {
              name: "清空已选",
              onClick: actions.onCleanSelected,
            },
          ];
        }}
        rowActions={(record, actions) => {
          const buttons: TableActionItem[] = [
            {
              name: "刷新",
              onClick: () => {
                actions.refreshAsync().then(() => {
                  message.success("This is a success action");
                });
              },
            },
            {
              name: "延时刷新",
              onClick: () => {
                actions.refreshAsync(2000).then(() => {
                  message.success("This is a success action");
                });
              },
            },
            {
              name: "删除",
              customType: "confirm",
              externalProps: {
                title: "确定要删除当前数据吗？",
              },
            },
          ];
          if (record.id! % 2 === 0) {
            buttons.push({
              name: "新建",
              onClick: () => message.error("This is a error action"),
            });
          }
          return buttons;
        }}
      />
    </div>
  );
}
