import gulp from "gulp"
import { deleteAsync } from "del"
import path from "path"
import fs from "fs"
import cp from "child_process"

gulp.task("clean", function () {
  return deleteAsync(["src/**/*.d.ts"])
})

// vue-tsc src/components/**/*.vue --declaration --emitDeclarationOnly --jsx react
gulp.task("gen", function (cb) {
  const cwd = process.cwd()
  process.env.PATH += `:${path.join(cwd, "node_modules", ".bin")}`
  // console.log(process.env.PATH)
  cp.exec("vue-tsc src/components/IpInput.vue --declaration --emitDeclarationOnly", function (err, stdout, stderr) {
    cb()
  })
})

gulp.task("copy", function (cb) {
  const originPath = "./src/components"
  const destPath = "./dist/IpInput.d.ts"
  if (fs.existsSync(destPath)) {
    fs.unlinkSync(destPath)
  }
  const dirs = fs.readdirSync(path.resolve(originPath))
  dirs.forEach(dir => {
    if (dir.endsWith(".d.ts")) {
      const content = fs.readFileSync(path.join(originPath, dir), "utf-8").replace(/_default/g, "IpInput")
      fs.writeFileSync(path.join(originPath, dir), content)
      fs.copyFileSync(path.join(originPath, dir), destPath)
    }
  })
  const distPath = "./dist"
  const files = fs.readdirSync(path.resolve(distPath))
  files.forEach(file => {
    if (file.endsWith(".css")) {
      const newName = "IpInput.css"
      fs.renameSync(path.join(distPath, file), path.join(distPath, newName))
    }
  })
  cb()
})

gulp.task("build", gulp.series("clean", "gen", "copy", "clean"))
