<template>
	<div id="login" v-if="show">
    <div>
					<el-row style="text-align:right">
						<el-button type="primary" class="btn rgiht" @click="jump_regist()">注册</el-button>
					</el-row>
				</div>
		<div class="login_wrap">

			<div class="wenzi">CMS</div>
			<div id="darkbannerwrap"></div>
			<form method="post">
				<div class="put"><i class="el-icon-news"></i><input v-model="user" placeholder="用户名"></div>
				<div class="put"><i class="el-icon-edit"></i><input v-model="password" placeholder="密码" type="password"
					v-on:keyup.enter="sub(password)"></div>
				<div>
					<el-row>
						<el-button type="primary" class="btn" @click="sub(password)">登录</el-button>
					</el-row>
				</div>
			</form>
      
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Login',
		data() {
			return {
				user: "",
				password: "",
				show: true
			}
		},
		methods: {
      jump_regist(){
        this.$router.push('/regist')
      },
			sub(pwd) {
				console.log(pwd)
				// var that = this;
				const username = this.user
        this.$axios.post('/api/login', {
          username, pwd
        }).then((res) => {
          // console.log("------ resss: ", res)
          if(res.data && res.data.message == "ok"){
            if(res.data.token) localStorage.setItem('token', res.data.token)
            if(res.data.userInfo) localStorage.setItem('userInfo', res.data.userInfo)
            this.$message.success('登录成功')
              setTimeout(() => {
                // this.$router.go(-1) //
                this.$router.push('/goods')
              }, 500);
          } else {
            this.$message.error(res.data.message)
          }
        });
			},
		},
		mounted() {
			
		}

	}
</script>

<style lang="less">
	#login {
		padding: 0px;
		margin: 0px;
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		border: hidden;
	}

	#login {
		background: url(../../../public/image/login.jpg) repeat left center;
		background-size: cover;
	}

	.login_wrap {
		margin: 180px auto 0 auto;
		min-height: 420px;
		max-width: 420px;
		padding: 40px;
		margin-left: auto;
		margin-right: auto;
		border-radius: 4px;
		box-sizing: border-box;
		text-align: center;

		.wenzi {
			width: 400px;
			text-align: center;
			font-size: 32px;
			color: #fff;
			letter-spacing: 3px;
		}

		.put {
			color: #fff;
			padding: 5px 0;
			width: 280px;
			margin-top: 30px;
			border: 2px solid #e0e0e0;
			border-radius: 20px;
			margin: 30px 0 20px 50px;
			font-size: 24px;
		}

		.put input {
			background: none;
			text-indent: 20px;
			outline: none;
			border: 0px;
			color: #fff;
			line-height: 40px;
			width: 80%;
			font-size: 16px;
		}

		.btn {
			width: 200px;
			margin-left: 40px;
		}
	}
</style>
