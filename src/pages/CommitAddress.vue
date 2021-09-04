<template>
  <div class="wrapper">
    <Header/>
    <div class="commit-address-main">
      <h2>Submit your ERC20 Address</h2>
      <div class="commit-address-container">
        <div class="commit-input">
          <input v-model="address" name="address" type="text" placeholder="ERC20 Address" autocomplete="off" />
          <a @click="pasteAddress"><svg id="bold" enable-background="new 0 0 24 24" height="25" viewBox="0 0 24 24" width="25" xmlns="http://www.w3.org/2000/svg"><path fill="#2CC5F4" d="m22.25 10h-8.5c-.966 0-1.75.784-1.75 1.75v10.5c0 .966.784 1.75 1.75 1.75h8.5c.966 0 1.75-.784 1.75-1.75v-10.5c0-.966-.784-1.75-1.75-1.75zm-2.125 10h-4.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h4.5c.414 0 .75.336.75.75s-.336.75-.75.75zm0-3h-4.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h4.5c.414 0 .75.336.75.75s-.336.75-.75.75z"/><path fill="#2CC5F4" d="m14.25 3h-1.25v-.25c0-.414-.336-.75-.75-.75h-1.104c-.328-1.153-1.389-2-2.646-2s-2.318.847-2.646 2h-1.104c-.414 0-.75.336-.75.75v.25h-1.25c-1.517 0-2.75 1.233-2.75 2.75v12.5c0 1.517 1.233 2.75 2.75 2.75h7.75v-9.25c0-1.792 1.458-3.25 3.25-3.25h3.25v-2.75c0-1.517-1.233-2.75-2.75-2.75zm-8.75.5h1c.414 0 .75-.336.75-.75 0-.689.561-1.25 1.25-1.25s1.25.561 1.25 1.25c0 .414.336.75.75.75h1v1.25c0 .138-.112.25-.25.25h-5.5c-.138 0-.25-.112-.25-.25z"/></svg></a>
        </div>
        <div class="commit-btn">
          <a class="btn" @click="submit" >Submit</a>
        </div>
      </div>
    </div>
    <subscribe />
  </div>
</template>

<script>
import Header from "@/section/Header";
import Subscribe from "@/section/Subscribe";
import WAValidator from "wallet-address-validator";
export default {
name: "CommitAddress",
  components: {Subscribe, Header},
  data() {
  return {
    address: ''
  }
  },
  methods: {
    async pasteAddress() {
      const text = await navigator.clipboard.readText();
      this.address = text;
    },
    submit() {
      if (!WAValidator.validate(this.address, 'ETH')) {
        this.$notify({
          type:'error',
          title: 'Invalid ERC20 Address'
        })
        return;
      }
        const requestOptions = {
        method: "POST",
      };
      fetch(`https://polkasmith.polkafoundry.com/api/v1/event/${this.$route.params.id}/gleam?kusama=xxx&erc20_address=${this.address}`, requestOptions)
          .then(response => response.json())
          .then(data => {
            console.log(data.data)
            if (!data || !data.data) {
              return
            }
            if (data.code && data.code !== 200) {
              this.$notify({
                type:'error',
                title: data.message
              })
              return;
            }
            if (data.data) {
              this.$notify({
                type:'success',
                title: data.message
              })
            } else {
              this.$notify({
                type:'error',
                title: data.message
              })
            }
          })
    }
  }
}
</script>
<style scoped>
.commit-address-container {
  display: flex;
  width: 100%;
  margin-bottom: 200px;
}
.commit-input {
  display: inline;
  position: relative;
}
.commit-btn {
  display: inline;
  margin-left: 20px;
}
.btn {
  float: right;
  cursor: pointer;
  width: 100%;
  background: transparent;
  font-size: 16px;
  border-radius: 60px;
  border: 2px solid #2CC5F4;
  color: #2CC5F4;
  padding: 15px 36px;
  font-weight: 600;
}

.btn:hover {
  color: white;
  background: #2CC5F4;
}
.commit-input input {
  flex: 1;
  border-radius: 60px;
  background: white;
  font-size: 14px;
  line-height: 26px;
  padding: 12px 20px 12px 12px;
  color: #0D1126;
  border: none;
  outline: none;
  min-width: 400px;
}
.commit-input a {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  cursor: pointer;
}
@media screen and (max-width: 680px) {
  .commit-address-container {
    flex-wrap: wrap;
    width: 100%;
  }
  .commit-input{
    width: 100%;
  }

  .commit-input input{
    min-width: 100%;
    width: 100%;
  }
  .commit-btn {
    width: 100%;
    margin-top: 20px;
    margin-left: 0;
  }
}

</style>
