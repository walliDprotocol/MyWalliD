import { toChecksumAddress } from "ethereumjs-util";

/* eslint-disable */

const mixinPlugin = {
  name: "mixinPlugin",
  components: {},
  methods: {
    checksumAddress(address) {
      const checksummed = address ? toChecksumAddress(address) : "";
      return checksummed;
    },
    getDomain(url) {
      var prefix = /^https?:\/\//i;
      var domain = /^[^\/:]+/;
      // remove any prefix
      url = url.replace(prefix, "");
      // assume any URL that starts with a / is on the current page's domain
      if (url.charAt(0) === "/") {
        url = window.location.hostname + url;
      }
      // now extract just the domain
      var match = url.match(domain);

      if (match) {
        return match[0];
      }
      return null;
    },
    getMethodName() {
      let error = {};
      try {
        throw new Error("");
      } catch (e) {
        error = e;
      }
      // IE9 does not have .stack property
      if (error.stack === undefined) {
        return "";
      }
      let stackTrace = error.stack.split("\n")[3];
      if (/ /.test(stackTrace)) {
        stackTrace = stackTrace.trim().split(" ")[1];
      }
      if (stackTrace && stackTrace.indexOf(".") > -1) {
        stackTrace = stackTrace.split(".")[1];
      }
      return stackTrace;
    },
    debug(a, ...args) {
      if (this) {
        let methodName = this.getMethodName();

        this.$log.debug(methodName + " | ", a, ...args);
      } else {
        console.log(a, ...args);
      }
    },
    logError(a, ...args) {
      if (this) {
        this.$log.error(a, ...args);
      } else {
        console.error(a, ...args);
      }
    },
  },
  data() {
    return {};
  },
};

/* eslint-enable */
export default mixinPlugin;
