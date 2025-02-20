
# Postgres 命令行检查

本章内容主要对测试题一中的部分命令行语法做校验。

## 创建脚本

```python
import subprocess
import pytest

# 数据库连接参数
DB_USER = "admin"
DB_NAME = "postgres"
DB_HOST = "localhost"  # 如果数据库是本地的，可以保持不变，如果是远程的，可以指定 IP 地址
DB_PORT = "5432"       # 默认 PostgreSQL 端口

# 构建连接参数
def get_psql_command(command):
    return ["psql", "-U", DB_USER, "-d", DB_NAME, "-h", DB_HOST, "-p", DB_PORT, "-c", command]

# 测试数据库连接
def test_psql_connection():
    result = subprocess.run(get_psql_command("SELECT 1"), capture_output=True, text=True)
    assert result.returncode == 0
    assert "1 row" in result.stdout

# 测试创建数据库
def test_create_database():
    result = subprocess.run(get_psql_command("CREATE DATABASE testdb;"), capture_output=True, text=True)
    assert result.returncode == 0
    print(result)

# 测试删除数据库
def test_drop_database():
    result = subprocess.run(get_psql_command("DROP DATABASE testdb;"), capture_output=True, text=True)
    assert result.returncode == 0

# 测试创建表
def test_create_table():
    result = subprocess.run(get_psql_command("CREATE TABLE testtable (id SERIAL PRIMARY KEY, name TEXT);"), capture_output=True, text=True)
    assert result.returncode == 0

# 测试查看表结构
def test_describe_table():
    result = subprocess.run(get_psql_command("\d testtable"), capture_output=True, text=True)
    assert result.returncode == 0

# 测试插入数据
def test_insert_data():
    result = subprocess.run(get_psql_command("INSERT INTO testtable (name) VALUES ('testname');"), capture_output=True, text=True)
    assert result.returncode == 0

# 测试查询数据
def test_select_data():
    result = subprocess.run(get_psql_command("SELECT * FROM testtable;"), capture_output=True, text=True)
    assert result.returncode == 0
    assert "testname" in result.stdout

# 测试更新数据
def test_update_data():
    result = subprocess.run(get_psql_command("UPDATE testtable SET name = 'newname' WHERE id = 1;"), capture_output=True, text=True)
    assert result.returncode == 0

# 测试删除数据
def test_delete_data():
    result = subprocess.run(get_psql_command("DELETE FROM testtable WHERE id = 1;"), capture_output=True, text=True)
    assert result.returncode == 0

# 测试删除表
def test_drop_table():
    result = subprocess.run(get_psql_command("DROP TABLE testtable;"), capture_output=True, text=True)
    assert result.returncode == 0

# 测试查看数据库列表
def test_list_databases():
    result = subprocess.run(get_psql_command("\l"), capture_output=True, text=True)
    assert result.returncode == 0
    assert "postgres" in result.stdout

# 测试退出 psql
def test_quit_psql():
    result = subprocess.run(get_psql_command("\q"), capture_output=True, text=True)
    assert result.returncode == 0

if __name__ == "__main__":
    pytest.main()
```

## 执行脚本

```bash
(.venv) (base) admin@admindeMBP test % pytest test_pg_commands.py
========================================================================= test session starts =========================================================================
platform darwin -- Python 3.11.11, pytest-8.3.4, pluggy-1.5.0
rootdir: /Users/admin/pypj/test
plugins: Faker-26.0.0
collected 12 items                                                                                                                                                    

test_pg_commands.py ............                                                                                                                                [100%]

========================================================================= 12 passed in 0.61s ==========================================================================
```

可以看到，语法校验均通过。
