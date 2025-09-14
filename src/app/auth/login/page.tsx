"use client";

import { Alert, Button, Card, Form, Input, Typography } from "antd";
import useLogin from "./hooks/useLogin";

export default function LoginPage() {
  const { loading, error, onFinish } = useLogin();

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <Card>
        <Typography.Title level={3} className="!mb-4">
          Đăng nhập
        </Typography.Title>
        {error && <Alert type="error" message={error} className="!mb-4" />}
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}>
            <Input placeholder="you@example.com" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}>
            <Input.Password placeholder="••••••••" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
