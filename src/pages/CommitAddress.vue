<template>
  <div class="wrapper">
    <Header/>
    <div class="commit-address-main">
      <h2>Submit your ERC20 Address</h2>
      <div class="commit-address-container">
        <div class="commit-input">
          <input v-model="address" name="address" type="text" placeholder="ERC20 Address" autocomplete="off" />
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
  font-size: 16px;
  line-height: 26px;
  padding: 12px 0 12px 32px;
  color: #0D1126;
  border: none;
  outline: none;
  min-width: 400px;
}

</style>
