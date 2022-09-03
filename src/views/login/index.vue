<template>
	<div class="login-page border-box">
		<div class="login-box border-box">
			<div class="list flex justify-between align-center border-box">
				<span class="name">手机号</span>
				<input
					class="inp phone-inp border-box"
					maxlength="11"
					v-model="proxyPhone"
					placeholder="请输入手机号码"
				/>
			</div>
			<div class="list flex justify-between align-center border-box">
				<span class="name">验证码</span>
				<div class="code flex justify-between align-center">
					<input
						class="inp code-inp border-box"
						v-model="validCode"
						placeholder="请输入验证码"
					/>
					<span class="repeat border-box" v-if="fetchCodeSend"
						>{{ countDown }}s重新获取</span
					>
					<span class="code-btn border-box pointer" @click="fetchCode" v-else
						>获取验证码</span
					>
				</div>
			</div>
			<div class="login-btn border-box pointer" @click="submit">登录</div>
		</div>
	</div>
</template>

<script>
	import { sendValidCode, login } from "@/api";
	export default {
		name: "login",
		data() {
			return {
				phone: this.$getSearch('phone') || "", // 手机号
				validCode: "", // 手机验证码
				countDown: 60, // 验证码倒计时
				fetchCodeSend: false, // 是否发送验证码
			};
		},
		computed: {
			proxyPhone: {
				get() {
					return this.phone;
				},
				set(newVal) {
					newVal = newVal.replaceAll(/\D/g, "");
					this.phone = event.target.value = newVal;
				},
			},
		},
		methods: {
			checkoutPhone() {
				if (!this.proxyPhone) {
					this.$message.error("请输入手机号");
					return false;
				} else if (!/^1\d{10}$/.test(this.proxyPhone)) {
					this.$message.error("请输入正确的手机号");
					return false;
				}

				return true;
			},

			// 倒数
			reciprocal() {
				this.countDown--;
				if (this.countDown <= 0) {
					this.fetchCodeSend = false;
					this.countDown = 60;
					return;
				}

				setTimeout(this.reciprocal, 1000);
			},

			// 获取验证码
			fetchCode() {
				if (!this.checkoutPhone()) return;

				sendValidCode({
					phone: this.proxyPhone,
				}).then((res) => {
					const { code, msg } = res;
					if (code != 200) return this.$message.error(msg);

					this.fetchCodeSend = true;
					this.reciprocal();
					this.$message("验证码已发送成功");
				});
			},

			// 登录
			submit() {
				if (!this.checkoutPhone()) return;

				login({
					phone: this.proxyPhone,
					validCode: this.validCode,
				}).then((res) => {
					let { code, msg, data } = res;
					if (code != 200) return this.$message.error(msg);

					localStorage.setItem("token", data.token);
					localStorage.setItem("userId", data.userId);
					localStorage.setItem("phone", this.proxyPhone);
					this.$router.push("/");
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.login-page {
		width: 10rem;
		margin: auto;

		.login-box {
			width: 100%;
			padding-top: 2.5rem;

			.list {
				width: 100%;
				padding: 0.4rem 1rem 0.4rem 1.2rem;
				border-bottom: 0.03rem solid #e6e6e6;

				.name {
					color: #626262;
					font-size: 0.5rem;
				}

				.inp {
					height: 1rem;
					padding: 0 0.2rem;
					border: none;
					outline: none;
					font-size: 0.4rem;
				}

				.code,
				.phone-inp {
					width: 5.5rem;
				}

				.code {
					.inp.code-inp {
						width: 3rem;
					}

					.repeat,
					.code-btn {
						width: 2.3rem;
						height: 0.8rem;
						border-radius: 0.15rem;
						line-height: 0.8rem;
						text-align: center;
						font-size: 0.32rem;
					}

					.code-btn {
						background-color: #1aa8db;
						color: #fff;
					}

					.repeat {
						background-color: #c3c3c3;
						color: #fff;
					}
				}
			}

			.login-btn {
				width: 5rem;
				height: 1.1rem;
				margin: 1.5rem auto;
				border-radius: 0.1rem;
				background-color: #1aa8db;
				line-height: 1.1rem;
				font-size: 0.4rem;
				color: #fff;
				text-align: center;
			}
		}
	}
</style>