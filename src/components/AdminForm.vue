<template>
  <div class="wrap">
    <el-tabs class="left-bar" :style="htmlHeight" tab-position="left">
      <el-tab-pane class="bar-item" label="主页面">
        <div class="header">
          <div class="bar">
            <!-- <router-link to="/"> -->
            <div class="logo">
              <img class="logo_pic" alt="" src="../assets/logo.png">
            </div>
            <div class="exit" @click="exit">
              <i class="el-icon-switch-button" />
            </div>
          <!-- </router-link> -->
          </div>
        </div>
        <div class="welcometext">Welcome to CityNorthBook</div>
      </el-tab-pane>
      <el-tab-pane class="bar-item" label="用户管理">
        <div class="header">
          <div class="bar">
            <div class="item-title">用户管理</div>
            <div class="search-box">
              <el-input
                v-model="searchuser"
                placeholder="请输入内容"
              />
              <div class="search-icon" @click="searchUser">
                <img src="@assets/icon/search.png" alt=""></div>
            </div>
            <div class="exit" @click="exit">
              <i class="el-icon-switch-button" />
            </div>
          </div>
        </div>
        <div class="info-table">
          <el-table
            :data="UserData.slice((curPage-1)*pagesize,curPage*pagesize)"
            border
            stripe
            style="width: 100%"
          >
            <el-table-column
              v-for="item in Userprop"
              :key="item.id"
              :prop="item.prop"
              :label="item.value"
              width="120"
              :show-overflow-tooltip="true"
              align="center"
            />
            <el-table-column
              fixed="right"
              label="操作"
              width="100"
              :show-overflow-tooltip="true"
              align="center"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click.native.prevent="viewUser(scope.row)">查看</el-button>
                <el-button type="text" size="small" style="color: red" @click.native.prevent="deleteUser(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination">
          <el-pagination
            :current-page.sync="curPage"
            :page-size="pagesize"
            :pager-count="5"
            :total="UserData.length"
            background
            layout="total, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
        <div class="edit">
          <el-dialog
            title="查看用户"
            :visible.sync="UsereditFormVisible"
            class="edit-form"
            :before-close="handleClose"
            :modal-append-to-body="false"
          >
            <el-form label-width="80px">
              <el-form-item label="用户ID">
                <el-input ref="userId" v-model="user.userId" readonly auto-complete="off" placeholder="" />
              </el-form-item>
              <el-form-item label="用户名">
                <el-input ref="userName" v-model="user.userName" readonly auto-complete="off" placeholder="" />
              </el-form-item>
              <el-form-item label="头像">
                <el-upload
                  ref="userPhoto"
                  v-model="user.userPhoto"
                  class="userpic"
                  action="#"
                  disabled
                  :on-success="handlePicSuccess"
                  :before-upload="beforePicUpload"
                >
                  <img class="userPic" :src="this.$host+user.userPhoto" alt="">
                </el-upload>
              </el-form-item>
              <el-form-item label="密码">
                <el-input ref="userPassword" v-model="user.userPassword" readonly auto-complete="off" placeholder="" />
              </el-form-item>
              <el-form-item label="注册时间">
                <el-input ref="userRegisterTime" v-model="user.userRegisterTime" readonly auto-complete="off" placeholder="" />
              </el-form-item>
              <el-form-item label="所在城市">
                <el-input ref="userCity" v-model="user.userCity" readonly auto-complete="off" placeholder="" />
              </el-form-item>
              <el-form-item label="个性签名">
                <el-input ref="userSelfLable" v-model="user.userSelfLable" readonly auto-complete="off" placeholder="" />
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group ref="userSex" v-model="user.userSex" readonly class="radio-group">
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="0">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="粉丝数">
                <el-input ref="userFanNum" v-model="user.userFanNum" readonly auto-complete="off" placeholder="" />
              </el-form-item>
              <el-form-item label="关注数">
                <el-input ref="userFollowNum" v-model="user.userFollowNum" readonly auto-complete="off" placeholder="" />
              </el-form-item>
              <el-form-item label="书评数">
                <el-input ref="userReviewNum" v-model="user.userReviewNum" readonly auto-complete="off" placeholder="" />
              </el-form-item>
              <el-form-item label="书摘数">
                <el-input ref="userExcerptsNum" v-model="user.userExcerptsNum" readonly auto-complete="off" placeholder="" />
              </el-form-item>
              <el-form-item label="动态数">
                <el-input ref="userMomentNum" v-model="user.userMomentNum" readonly auto-complete="off" placeholder="" />
              </el-form-item>
              <el-form-item label="密保问题">
                <el-input ref="userSecurityQuestion" v-model="user.userSecurityQuestion" readonly auto-complete="off" placeholder="" />
              </el-form-item>
              <el-form-item label="密保答案">
                <el-input ref="userSecurityQuestionAnswer" v-model="user.userSecurityQuestionAnswer" readonly auto-complete="off" placeholder="" />
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="UsereditFormVisible = false">取消</el-button>
            </span>
          </el-dialog>
          <el-dialog
            title="提示"
            style="text-align:left !important"
            :visible.sync="UserconferVisible"
            :before-close="handleClose"
          >
            <span>你确定要删除这名用户吗?</span>
            <span slot="footer" class="dialog-footer">
              <el-button type="danger" @click="handleUserDel()">删除</el-button>
              <el-button type="primary" @click="UserconferVisible = false">取消</el-button>
            </span>
          </el-dialog>
        </div>
      </el-tab-pane>
      <el-tab-pane class="bar-item" label="书籍管理">
        <div class="header">
          <div class="bar">
            <div class="item-title">书籍管理</div>
            <div class="search-box">
              <el-input
                v-model="searchbook"
                placeholder="请输入内容"
              />
              <div class="search-icon" @click="searchBook">
                <img src="@assets/icon/search.png" alt=""></div>
            </div>
            <el-button
              type="success"
              icon="el-icon-circle-plus-outline"
              size="mini"
              round
              class="addbutton"
              @click="addFlag=true; BookeditFormVisible = true "
            >新增</el-button>
            <div class="exit" @click="exit">
              <i class="el-icon-switch-button" />
            </div>
          </div>
        </div>
        <div class="info-table">
          <el-table
            :data="BookData.slice((curPage-1)*pagesize,curPage*pagesize)"
            border
            stripe
            style="width: 100%"
          >
            <el-table-column
              v-for="item in Bookprop"
              :key="item.id"
              :prop="item.prop"
              :label="item.value"
              width="120"
              :show-overflow-tooltip="true"
              align="center"
            />
            <el-table-column
              fixed="right"
              label="操作"
              width="100"
              :show-overflow-tooltip="true"
              align="center"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click.native.prevent="editBook(scope.row)">编辑</el-button>
                <el-button type="text" size="small" style="color: red" @click.native.prevent="deleteBook(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination">
          <el-pagination
            :current-page.sync="curPage"
            :page-size="pagesize"
            :pager-count="5"
            :total="BookData.length"
            background
            layout="total, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
        <div class="edit">
          <el-dialog
            :title="addFlag?'新增图书':'修改图书'"
            :visible.sync="BookeditFormVisible"
            class="edit-form"
            :before-close="handleClose"
            :modal-append-to-body="false"
          >
            <el-form label-width="80px">
              <el-form-item label="书本ID">
                <el-input ref="bookId" v-model="book.bookId" readonly :disabled="addFlag" auto-complete="off" placeholder="请输入书本ID" />
              </el-form-item>
              <el-form-item label="书名">
                <el-input ref="bookName" v-model="book.bookName" auto-complete="off" placeholder="请输入书名" />
              </el-form-item>
              <el-form-item label="封面">
                <el-upload
                  ref="bookPhotoUrl"
                  v-model="book.bookPhotoUrl"
                  class="picupload"
                  action="#"
                  :on-success="handlePicSuccess"
                  :before-upload="beforePicUpload"
                >
                  <img class="bookPic" :src="picUrl||this.$host+book.bookPhotoUrl" alt="">
                </el-upload>
              </el-form-item>
              <el-form-item label="出品方名">
                <el-input ref="producerName" v-model="book.producerName" auto-complete="off" placeholder="请输入出品方名" />
              </el-form-item>
              <el-form-item label="出版社名">
                <el-input ref="publisherName" v-model="book.publisherName" auto-complete="off" placeholder="请输入出版社名" />
              </el-form-item>
              <el-form-item label="作者名">
                <el-input ref="authorName" v-model="book.authorName" auto-complete="off" placeholder="请输入作者名" />
              </el-form-item>
              <el-form-item label="出版时间">
                <el-input ref="bookPublishTime" v-model="book.bookPublishTime" auto-complete="off" placeholder="请输入出版时间" />
              </el-form-item>
              <el-form-item label="ISBN码">
                <el-input ref="bookISBNCode" v-model="book.bookISBNCode" auto-complete="off" placeholder="请输入ISBN码" />
              </el-form-item>
              <el-form-item label="评分">
                <el-input ref="bookScore" v-model="book.bookScore" readonly :disabled="addFlag" auto-complete="off" placeholder="请输入评分" />
              </el-form-item>
              <el-form-item label="是否外籍">
                <el-radio-group ref="bookIsForeign" v-model="book.bookIsForeign" class="radio-group">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="译者">
                <el-input ref="bookTranslator" v-model="book.bookTranslator" auto-complete="off" placeholder="请输入译者" />
              </el-form-item>
              <el-form-item label="标签">
                <el-input ref="bookLable" v-model="book.bookLable" auto-complete="off" placeholder="请输入标签" />
              </el-form-item>
              <el-form-item label="分类">
                <el-input ref="bookCategory" v-model="book.bookCategory" auto-complete="off" placeholder="请输入分类" />
              </el-form-item>
              <el-form-item label="书籍简介">
                <el-input ref="bookIntroduce" v-model="book.bookIntroduce" type="textarea" :row="4" auto-complete="off" placeholder="请输入书籍简介" />
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="success" @click="saveBook()">提交</el-button>
              <el-button type="primary" @click="BookeditFormVisible = false">取消</el-button>
            </span>
          </el-dialog>
          <el-dialog
            title="提示"
            style="text-align:left !important"
            :visible.sync="BookconferVisible"
            :before-close="handleClose"
            :modal-append-to-body="false"
          >
            <span>你确定要删除这本图书吗?</span>
            <span slot="footer" class="dialog-footer">
              <el-button type="danger" @click="handleBookDel()">删除</el-button>
              <el-button type="primary" @click="BookconferVisible = false">取消</el-button>
            </span>
          </el-dialog>
        </div>
      </el-tab-pane>
      <el-tab-pane class="bar-item" label="出版社管理">
        <div class="header">
          <div class="bar">
            <div class="item-title">出版社管理</div>
            <div class="search-box">
              <el-input
                v-model="searchpublisher"
                placeholder="请输入内容"
              />
              <div class="search-icon" @click="searchPublisher">
                <img src="@assets/icon/search.png" alt=""></div>
            </div>
            <el-button
              type="success"
              icon="el-icon-circle-plus-outline"
              size="mini"
              round
              class="addbutton"
              @click="addFlag=true; PublishereditFormVisible = true"
            >新增</el-button>
            <div class="exit" @click="exit">
              <i class="el-icon-switch-button" />
            </div>
          </div>
        </div>
        <div class="info-table">
          <el-table
            :data="PublisherData.slice((curPage-1)*pagesize,curPage*pagesize)"
            border
            stripe
            style="width: 100%"
          >
            <el-table-column
              v-for="item in Publisherprop"
              :key="item.id"
              :prop="item.prop"
              :label="item.value"
              :show-overflow-tooltip="true"
              align="center"
            />
            <el-table-column
              fixed="right"
              label="操作"
              width="100"
              :show-overflow-tooltip="true"
              align="center"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click.native.prevent="editPublisher(scope.row)">编辑</el-button>
                <el-button type="text" size="small" style="color: red" @click.native.prevent="deletePublisher(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination">
          <el-pagination
            :current-page.sync="curPage"
            :page-size="pagesize"
            :pager-count="5"
            :total="PublisherData.length"
            background
            layout="total, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
        <div class="edit">
          <el-dialog
            :title="addFlag?'新增出版社':'修改出版社'"
            :visible.sync="PublishereditFormVisible"
            class="edit-form"
            :before-close="handleClose"
            :modal-append-to-body="false"
          >
            <el-form ref="editform" label-width="80px">
              <el-form-item label="出版社ID">
                <el-input ref="publisherId" v-model="publisher.publisherId" :disabled="addFlag" readonly auto-complete="off" placeholder="请输入出版社ID" />
              </el-form-item>
              <el-form-item label="出版社名">
                <el-input ref="publisherName" v-model="publisher.publisherName" auto-complete="off" placeholder="请输入出版社名称" />
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="success" @click="savePublisher()">提交</el-button>
              <el-button type="primary" @click="PublishereditFormVisible = false">取消</el-button>
            </span>
          </el-dialog>
          <el-dialog
            title="提示"
            style="text-align:left !important"
            :visible.sync="PublisherconferVisible"
            :before-close="handleClose"
            :modal-append-to-body="false"
          >
            <span>你确定要删除这家出版社吗?</span>
            <span slot="footer" class="dialog-footer">
              <el-button type="danger" @click="handlePublisherDel()">删除</el-button>
              <el-button type="primary" @click="PublisherconferVisible = false">取消</el-button>
            </span>
          </el-dialog>
        </div>
      </el-tab-pane>
      <el-tab-pane class="bar-item" label="出品方管理">
        <div class="header">
          <div class="bar">
            <div class="item-title">出品方管理</div>
            <div class="search-box">
              <el-input
                v-model="searchproducer"
                placeholder="请输入内容"
                type="text"
              />
              <div class="search-icon" @click="searchProducer">
                <img src="@assets/icon/search.png" alt=""></div>
            </div>
            <el-button
              type="success"
              icon="el-icon-circle-plus-outline"
              size="mini"
              round
              class="addbutton"
              @click="addFlag=true; ProducereditFormVisible = true "
            >新增</el-button>
            <div class="exit" @click="exit">
              <i class="el-icon-switch-button" />
            </div>
          </div>
        </div>
        <div class="info-table">
          <el-table
            :data="ProducerData.slice((curPage-1)*pagesize,curPage*pagesize)"
            border
            stripe
            style="width: 100%"
          >
            <el-table-column
              v-for="item in Producerprop"
              :key="item.id"
              :prop="item.prop"
              :label="item.value"
              :show-overflow-tooltip="true"
              align="center"
            />
            <el-table-column
              label="操作"
              width="100"
              :show-overflow-tooltip="true"
              align="center"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click.native.prevent="editProducer(scope.row)">编辑</el-button>
                <el-button type="text" size="small" style="color: red" @click.native.prevent="deleteProducer(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination">
          <el-pagination
            :current-page.sync="curPage"
            :page-size="pagesize"
            :pager-count="5"
            :total="ProducerData.length"
            background
            layout="total, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
        <div class="edit">
          <el-dialog
            :title="addFlag?'新增出品方':'修改出品方'"
            :visible.sync="ProducereditFormVisible"
            class="edit-form"
            :before-close="handleClose"
          >
            <el-form label-width="80px">
              <el-form-item label="出品方ID">
                <el-input ref="producerId" v-model="producer.producerId" readonly :disabled="addFlag" auto-complete="off" placeholder="请输入出品方ID" />
              </el-form-item>
              <el-form-item label="出品方名">
                <el-input ref="producerName" v-model="producer.producerName" auto-complete="off" placeholder="请输入出品方名称" />
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="success" @click="saveProducer()">提交</el-button>
              <el-button type="primary" @click="ProducereditFormVisible = false">取消</el-button>
            </span>
          </el-dialog>
          <el-dialog
            title="提示"
            style="text-align:left !important"
            :visible.sync="ProducerconferVisible"
            :before-close="handleClose"
          >
            <span>你确定要删除这家出品方吗?</span>
            <span slot="footer" class="dialog-footer">
              <el-button type="danger" @click="handleProducerDel()">删除</el-button>
              <el-button type="primary" @click="ProducerconferVisible = false">取消</el-button>
            </span>
          </el-dialog>
        </div>
      </el-tab-pane>
      <el-tab-pane class="bar-item" label="作者管理">
        <div class="header">
          <div class="bar">
            <div class="item-title">作者管理</div>
            <div class="search-box">
              <el-input
                v-model="searchauthor"
                placeholder="请输入内容"
              />
              <div class="search-icon" @click="searchAuthor">
                <img src="@assets/icon/search.png" alt=""></div>
            </div>
            <el-button
              type="success"
              icon="el-icon-circle-plus-outline"
              size="mini"
              round
              class="addbutton"
              @click="addFlag=true; AuthoreditFormVisible = true "
            >新增</el-button>
            <div class="exit" @click="exit">
              <i class="el-icon-switch-button" />
            </div>
          </div>
        </div>
        <div class="info-table">
          <el-table
            :data="AuthorData.slice((curPage-1)*pagesize,curPage*pagesize)"
            border
            stripe
            style="width: 100%"
          >
            <el-table-column
              v-for="item in Authorprop"
              :key="item.id"
              :prop="item.prop"
              :label="item.value"
              :show-overflow-tooltip="true"
              align="center"
            />
            <el-table-column
              label="操作"
              width="100"
              :show-overflow-tooltip="true"
              align="center"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click.native.prevent="editAuthor(scope.row)">编辑</el-button>
                <el-button type="text" size="small" style="color: red" @click.native.prevent="deleteAuthor(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination">
          <el-pagination
            :current-page.sync="curPage"
            :page-size="pagesize"
            :pager-count="5"
            :total="AuthorData.length"
            background
            layout="total, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
        <div class="edit">
          <el-dialog
            :title="addFlag?'新增作者':'修改作者'"
            :visible.sync="AuthoreditFormVisible"
            class="edit-form"
            :before-close="handleClose"
          >
            <el-form label-width="80px">
              <el-form-item label="作者ID">
                <el-input ref="authorId" v-model="author.authorId" readonly :disabled="addFlag" auto-complete="off" placeholder="请输入作者ID" />
              </el-form-item>
              <el-form-item label="作者名">
                <el-input ref="authorName" v-model="author.authorName" auto-complete="off" placeholder="请输入作者名" />
              </el-form-item>
              <el-form-item label="国籍">
                <el-input ref="authorCountry" v-model="author.authorCountry" auto-complete="off" placeholder="请输入国籍" />
              </el-form-item>
              <el-form-item label="生日">
                <el-input ref="authorBirthday" v-model="author.authorBirthday" auto-complete="off" placeholder="请输入生日" />
              </el-form-item>
              <el-form-item label="简介">
                <el-input ref="authorIntroduce" v-model="author.authorIntroduce" type="textarea" :row="4" auto-complete="off" placeholder="请输入简介" />
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="success" @click="saveAuthor()">提交</el-button>
              <el-button type="primary" @click="AuthoreditFormVisible = false">取消</el-button>
            </span>
          </el-dialog>
          <el-dialog
            title="提示"
            style="text-align:left !important"
            :visible.sync="AuthorconferVisible"
            :before-close="handleClose"
          >
            <span>你确定要删除这名作者吗?</span>
            <span slot="footer" class="dialog-footer">
              <el-button type="danger" @click="handleAuthorDel()">删除</el-button>
              <el-button type="primary" @click="AuthorconferVisible = false">取消</el-button>
            </span>
          </el-dialog>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane class="bar-item" label="专栏管理">专栏管理</el-tab-pane> -->
      <el-tab-pane class="bar-item" label="举报管理">
        <div class="header">
          <div class="bar">
            <div class="item-title">举报管理</div>
            <!-- <div class="search-box">
              <el-input
                v-model="searchreport"
                placeholder="请输入内容"
              />
              <div class="search-icon">
                <img src="@assets/icon/search.png" alt=""></div>
            </div> -->
            <div class="exit" @click="exit">
              <i class="el-icon-switch-button" />
            </div>
          </div>
        </div>
        <div class="info-table">
          <el-tabs type="border-card" class="report-tab">
            <el-tab-pane label="举报书评">
              <el-table
                :data="ReportreviewData.slice((curPage-1)*reportpagesize,curPage*reportpagesize)"
                border
                stripe
                style="width: 100%"
              >
                <el-table-column
                  v-for="item in Reportreviewprop"
                  :key="item.id"
                  :prop="item.prop"
                  :label="item.value"
                  :show-overflow-tooltip="true"
                  align="center"
                />
                <el-table-column
                  label="操作"
                  width="100"
                  :show-overflow-tooltip="true"
                  align="center"
                >
                  <template slot-scope="scope">
                    <!-- <el-button type="text" size="small" @click.native.prevent="viewReportreview(scope.row)">查看</el-button> -->
                    <el-button type="text" size="small" style="color: red" @click.native.prevent="deleteReportreview(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                :current-page.sync="curPage"
                :page-size="pagesize"
                :pager-count="5"
                :total="ReportreviewData.length"
                background
                layout="total, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
              <div class="edit">
                <el-dialog
                  title="提示"
                  style="text-align:left !important"
                  :visible.sync="ReportconferVisible"
                  :before-close="handleClose"
                >
                  <span>你确定要删除这篇书评吗?</span>
                  <span slot="footer" class="dialog-footer">
                    <el-button type="danger" @click="handleReviewDel()">删除</el-button>
                    <el-button type="primary" @click="ReportconferVisible = false">取消</el-button>
                  </span>
                </el-dialog>
              </div>
            </el-tab-pane>
            <el-tab-pane label="举报动态">
              <el-table
                :data="ReportmomentData.slice((curPage-1)*reportpagesize,curPage*reportpagesize)"
                border
                stripe
                style="width: 100%"
              >
                <el-table-column
                  v-for="item in Reportmomentprop"
                  :key="item.id"
                  :prop="item.prop"
                  :label="item.value"
                  :show-overflow-tooltip="true"
                  align="center"
                />
                <el-table-column prop="moment.momentPhoto" label="动态图片" align="center" width="400" :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    <el-image v-for="item in scope.row.moment.momentPhoto" :key="item.id" :src="'http://chengbei.site:8080'+item.photoSrc" style="width: 80px; height: 80px; margin-left: 10px" :preview-src-list="scope.row.moment.momentPhoto" />
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="100"
                  :show-overflow-tooltip="true"
                  align="center"
                  fixed="right"
                >
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click.native.prevent="viewReportmoment(scope.row)">查看</el-button>
                    <el-button type="text" size="small" style="color: red" @click.native.prevent="deleteReportmoment(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                :current-page.sync="curPage"
                :page-size="pagesize"
                :pager-count="5"
                :total="ReportreviewData.length"
                background
                layout="total, prev, pager, next, jumper"
                class="pagination-report"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
              <div class="edit">
                <el-dialog
                  title="查看动态图片"
                  :visible.sync="ReporteditFormVisible"
                  class="edit-form"
                  :before-close="handleClose"
                >
                  <div class="momentBigPhoto">
                    <el-image v-for="item in momentPhoto" :key="item.id" :src="'http://chengbei.site:8080'+item.photoSrc" :preview-src-list="momentPhoto" />
                  </div>
                  <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="ReporteditFormVisible = false">取消</el-button>
                  </span>
                </el-dialog>
                <el-dialog
                  title="提示"
                  style="text-align:left !important"
                  :visible.sync="ReportconferVisible"
                  :before-close="handleClose"
                >
                  <span>你确定要删除这篇动态吗?</span>
                  <span slot="footer" class="dialog-footer">
                    <el-button type="danger" @click="handleMomentDel()">删除</el-button>
                    <el-button type="primary" @click="ReportconferVisible = false">取消</el-button>
                  </span>
                </el-dialog>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
/*global axios */
// import axios from 'axios'
export default {
  name: 'AdminForm',
  data() {
    return {
      htmlHeight: {
        height: '569px'
      },
      readonly: true,
      addFlag: true,
      editFormVisible: false,
      conferVisible: false,
      UsereditFormVisible: false,
      UserconferVisible: false,
      BookeditFormVisible: false,
      BookconferVisible: false,
      PublishereditFormVisible: false,
      PublisherconferVisible: false,
      ProducereditFormVisible: false,
      ProducerconferVisible: false,
      AuthoreditFormVisible: false,
      AuthorconferVisible: false,
      ReporteditFormVisible: false,
      ReportconferVisible: false,
      pagesize: 7,
      reportpagesize: 4,
      curPage: 1,
      total: 0,
      user: {},
      book: {},
      publisher: {},
      producer: {},
      author: {},
      reportreview: {},
      reportmoment: {},
      momentPhoto: [],
      searchuser: '',
      searchbook: '',
      searchproducer: '',
      searchpublisher: '',
      searchauthor: '',
      searchreport: '',
      searchData: [],
      picUrl: '',
      bookPicUrl: '',
      Userprop: [
        {
          prop: 'userId',
          value: '用户ID'
        },
        {
          prop: 'userName',
          value: '用户名'
        },
        {
          prop: 'userPassword',
          value: '密码'
        },
        {
          prop: 'userRegisterTime',
          value: '注册时间'
        },
        {
          prop: 'userSex',
          value: '性别'
        },
        {
          prop: 'userCity',
          value: '所在城市'
        },
        {
          prop: 'userSelfLable',
          value: '个性签名'
        },
        {
          prop: 'userFanNum',
          value: '粉丝数'
        },
        {
          prop: 'userFollowNum',
          value: '关注数'
        },
        {
          prop: 'userReviewNum',
          value: '书评数'
        },
        {
          prop: 'userExcerptsNum',
          value: '书摘数'
        },
        {
          prop: 'userMomentNum',
          value: '动态数'
        },
        {
          prop: 'userSecurityQuestion',
          value: '密保问题'
        },
        {
          prop: 'userSecurityQuestionAnswer',
          value: '密保答案'
        }
      ],
      UserData: [],
      Bookprop: [
        {
          prop: 'bookId',
          value: '书本ID'
        },
        {
          prop: 'bookName',
          value: '书名'
        },
        {
          prop: 'producerName',
          value: '出品方名'
        },
        {
          prop: 'publisherName',
          value: '出版社名'
        },
        {
          prop: 'authorName',
          value: '作者名'
        },
        {
          prop: 'bookPublishTime',
          value: '出版时间'
        },
        {
          prop: 'bookISBNCode',
          value: 'ISBN码'
        },
        {
          prop: 'bookScore',
          value: '评分'
        },
        {
          prop: 'bookIsForeign',
          value: '是否外籍'
        },
        {
          prop: 'bookTranslator',
          value: '译者'
        },
        {
          prop: 'bookIntroduce',
          value: '简介'
        },
        {
          prop: 'bookLable',
          value: '标签'
        },
        {
          prop: 'bookCategory',
          value: '分类'
        }
      ],
      BookData: [],
      Publisherprop: [
        {
          prop: 'publisherId',
          value: '出版社ID'
        },
        {
          prop: 'publisherName',
          value: '出版社名'
        }
      ],
      PublisherData: [],
      Producerprop: [
        {
          prop: 'producerId',
          value: '出品方ID'
        },
        {
          prop: 'producerName',
          value: '出品方名'
        }
      ],
      ProducerData: [],
      Authorprop: [
        {
          prop: 'authorId',
          value: '作者ID'
        },
        {
          prop: 'authorName',
          value: '作者名'
        },
        {
          prop: 'authorCountry',
          value: '国籍'
        },
        {
          prop: 'authorBirthday',
          value: '生日'
        },
        {
          prop: 'authorIntroduce',
          value: '简介'
        }
      ],
      AuthorData: [],
      Reportreviewprop: [
        {
          prop: 'reviewId',
          value: '书评ID'
        },
        {
          prop: 'userId',
          value: '举报人ID'
        },
        {
          prop: 'user.userName',
          value: '举报人用户名'
        },
        {
          prop: 'reportuser.userId',
          value: '被举报用户ID'
        },
        {
          prop: 'reportuser.userName',
          value: '被举报用户名'
        },
        {
          prop: 'review.reviewTitle',
          value: '书评标题'
        },
        {
          prop: 'review.reviewTime',
          value: '书评发表时间'
        },
        {
          prop: 'review.reviewText',
          value: '书评内容'
        }
      ],
      ReportreviewData: [],
      Reportmomentprop: [
        {
          prop: 'momentId',
          value: '动态ID'
        },
        {
          prop: 'userId',
          value: '举报人ID'
        },
        {
          prop: 'user.userName',
          value: '举报人用户名'
        },
        {
          prop: 'reportuser.userId',
          value: '被举报用户ID'
        },
        {
          prop: 'reportuser.userName',
          value: '被举报用户名'
        },
        {
          prop: 'moment.momentTime',
          value: '动态发表时间'
        },
        {
          prop: 'moment.momentContent',
          value: '动态内容'
        }
      ],
      ReportmomentData: []
    }
  },
  created: function() {
    console.log(this.$store.state.admin.admintoken)
    this.getUser()
    this.getBook()
    this.getPublisher()
    this.getProducer()
    this.getAuthor()
    this.getReport()
  },
  mounted: function() {
    this.fixheight()
  },
  methods: {
    fixheight() {
      const htmlHeight = window.innerHeight + 'px'
      this.$set(this.htmlHeight, 'height', htmlHeight)
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.getUser()
      this.getBook()
      this.getPublisher()
      this.getProducer()
      this.getAuthor()
    },
    handleCurrentChange(val) {
      this.curPage = val
      this.getUser()
      this.getBook()
      this.getPublisher()
      this.getProducer()
      this.getAuthor()
    },
    getUser() {
      const fd = new FormData()
      const that = this
      axios.post('/api/admin/user', fd, { headers: {
        'token': that.$store.state.admin.admintoken
      }}).then(function(res) {
        // console.log(res.data.users[0])
        that.UserData = res.data.users
      })
    },
    viewUser(row) {
      console.log(row)
      this.UsereditFormVisible = true
      this.addFlag = false
      this.user = row
    },
    deleteUser(row) {
      this.UserconferVisible = true
      this.user = row
    },
    getBook() {
      const fd = new FormData()
      const that = this
      axios.post('/api/admin/book', fd, { headers: {
        'token': that.$store.state.admin.admintoken
      }}).then(function(res) {
        // console.log(res.data.books[0])
        that.BookData = res.data.books
      })
    },
    editBook(row) {
      console.log(row)
      this.BookeditFormVisible = true
      this.addFlag = false
      this.book = row
    },
    deleteBook(row) {
      this.BookconferVisible = true
      this.book = row
    },
    beforePicUpload(file) {
      const formData = new FormData()
      const that = this
      formData.append('bookPhoto', file)
      console.log(file)
      axios.post('/api/admin/book/photo', formData, { headers: {
        'token': that.$store.state.admin.admintoken
      }}).then(function(res) {
        console.log(file)
        that.picUrl = window.URL.createObjectURL(file)
        console.log(res.data)
        console.log('11' + that.picUrl)
        console.log('22' + res.data.bookPhoto)
        that.bookPicUrl = res.data.bookPhoto
        console.log('33' + that.bookPicUrl)
      })
    },
    saveBook() {
      const formData = new FormData()
      const that = this
      that.picUrl = ''
      console.log('44' + that.bookPicUrl)
      if (that.addFlag) {
        formData.append('bookName', this.$refs.bookName.value)
        formData.append('bookPhoto', that.bookPicUrl)
        formData.append('producerName', this.$refs.producerName.value)
        formData.append('publisherName', this.$refs.publisherName.value)
        formData.append('authorName', this.$refs.authorName.value)
        formData.append('bookPublishTime', this.$refs.bookPublishTime.value)
        formData.append('bookISBN', this.$refs.bookISBNCode.value)
        formData.append('bookIsForeign', this.$refs.bookIsForeign.value)
        formData.append('bookLable', this.$refs.bookLable.value)
        formData.append('bookCategory', this.$refs.bookCategory.value)
        formData.append('bookIntroduce', this.$refs.bookIntroduce.value)
        axios.post('/api/admin/book/add', formData, { headers: {
          'token': that.$store.state.admin.admintoken
        }}).then(function(res) {
          console.log(res.data)
          that.$message({
            type: 'success',
            message: '添加成功'
          })
        })
      } else {
        formData.append('bookId', this.$refs.bookId.value)
        formData.append('bookName', this.$refs.bookName.value)
        formData.append('bookPhoto', this.bookPicUrl)
        formData.append('producerName', this.$refs.producerName.value)
        formData.append('publisherName', this.$refs.publisherName.value)
        formData.append('authorName', this.$refs.authorName.value)
        formData.append('bookPublishTime', this.$refs.bookPublishTime.value)
        formData.append('bookISBN', this.$refs.bookISBNCode.value)
        formData.append('bookIsForeign', this.$refs.bookIsForeign.value)
        formData.append('bookTranslator', this.$refs.bookTranslator.value)
        formData.append('bookLable', this.$refs.bookLable.value)
        formData.append('bookCategory', this.$refs.bookCategory.value)
        formData.append('bookIntroduce', this.$refs.bookIntroduce.value)
        // console.log(this.$refs.bookISBNCode.value)
        axios.post('/api/admin/book/modify', formData, { headers: {
          'token': that.$store.state.admin.admintoken
        }}).then(function(res) {
          console.log(res.data)
          // console.log(this.bookPicUrl)
          that.$message({
            type: 'success',
            message: '修改成功'
          })
        })
      }
      that.getBook()
      return false
    },
    getPublisher() {
      const fd = new FormData()
      const that = this
      axios.post('/api/admin/publisher', fd, { headers: {
        'token': that.$store.state.admin.admintoken
      }}).then(function(res) {
        // console.log(res.data)
        // console.log(res.data.publishers[0])
        that.PublisherData = res.data.publishers
      })
    },
    editPublisher(row) {
      console.log(row)
      this.PublishereditFormVisible = true
      this.addFlag = false
      this.publisher = row
    },
    deletePublisher(row) {
      this.PublisherconferVisible = true
      this.publisher = row
    },
    savePublisher() {
      const formData = new FormData()
      const that = this
      if (this.addFlag) {
        formData.append('publisherName', this.$refs.publisherName.value)
        axios.post('/api/admin/publisher/add', formData, { headers: {
          'token': that.$store.state.admin.admintoken
        }}).then(function(res) {
          console.log(res.data)
          that.$message({
            type: 'success',
            message: '添加成功'
          })
        })
      } else {
        formData.append('publisherId', this.$refs.publisherId.value)
        formData.append('publisherName', this.$refs.publisherName.value)
        axios.post('/api/admin/publisher/modify', formData, { headers: {
          'token': that.$store.state.admin.admintoken
        }}).then(function(res) {
          console.log(res.data)
          that.$message({
            type: 'success',
            message: '修改成功'
          })
        })
      }
      that.getPublisher()
    },
    getProducer() {
      const fd = new FormData()
      const that = this
      axios.post('/api/admin/producer', fd, { headers: {
        'token': that.$store.state.admin.admintoken
      }}).then(function(res) {
        // console.log(res.data)
        // console.log(res.data.producers[0])
        that.ProducerData = res.data.producers
      })
    },
    editProducer(row) {
      console.log(row)
      this.ProducereditFormVisible = true
      this.addFlag = false
      this.producer = row
    },
    deleteProducer(row) {
      this.ProducerconferVisible = true
      this.producer = row
    },
    saveProducer() {
      const formData = new FormData()
      const that = this
      console.log('addFlag:' + this.addFlag)
      if (this.addFlag) {
        formData.append('producerName', this.$refs.producerName.value)
        axios.post('/api/admin/producer/add', formData, { headers: {
          'token': that.$store.state.admin.admintoken
        }}).then(function(res) {
          console.log(res.data)
          that.$message({
            type: 'success',
            message: '添加成功'
          })
        })
      } else {
        formData.append('producerId', this.$refs.producerId.value)
        formData.append('producerName', this.$refs.producerName.value)
        axios.post('/api/admin/producer/modify', formData, { headers: {
          'token': that.$store.state.admin.admintoken
        }}).then(function(res) {
          console.log(res.data)
          that.$message({
            type: 'success',
            message: '修改成功'
          })
        })
      }
      that.getProducer()
    },
    getAuthor() {
      const fd = new FormData()
      const that = this
      axios.post('/api/admin/author', fd, { headers: {
        'token': that.$store.state.admin.admintoken
      }}).then(function(res) {
        // console.log(res.data)
        // console.log(res.data.authors)
        that.AuthorData = res.data.authors
      })
    },
    editAuthor(row) {
      console.log(row)
      this.AuthoreditFormVisible = true
      this.addFlag = false
      this.author = row
    },
    deleteAuthor(row) {
      this.AuthorconferVisible = true
      this.author = row
    },
    saveAuthor() {
      const formData = new FormData()
      const that = this
      console.log('addFlag:' + this.addFlag)
      if (this.addFlag) {
        formData.append('authorName', this.$refs.authorName.value)
        formData.append('authorCountry', this.$refs.authorCountry.value)
        formData.append('authorBirthday', this.$refs.authorBirthday.value)
        formData.append('authorIntroduce', this.$refs.authorIntroduce.value)
        axios.post('/api/admin/author/add', formData, { headers: {
          'token': that.$store.state.admin.admintoken
        }}).then(function(res) {
          console.log(res.data)
          that.$message({
            type: 'success',
            message: '添加成功'
          })
        })
      } else {
        formData.append('authorId', this.$refs.authorId.value)
        formData.append('authorName', this.$refs.authorName.value)
        formData.append('authorCountry', this.$refs.authorCountry.value)
        formData.append('authorBirthday', this.$refs.authorBirthday.value)
        formData.append('authorIntroduce', this.$refs.authorIntroduce.value)
        axios.post('/api/admin/author/modify', formData, { headers: {
          'token': that.$store.state.admin.admintoken
        }}).then(function(res) {
          console.log(res.data)
          that.$message({
            type: 'success',
            message: '修改成功'
          })
        })
      }
      that.getAuthor()
    },
    getReport() {
      const fd = new FormData()
      const that = this
      axios.post('/api/admin/report', fd, { headers: {
        'token': that.$store.state.admin.admintoken
      }}).then(function(res) {
        // console.log(res.data)
        // console.log(res.data.reportreview)
        that.ReportreviewData = res.data.reportreview
        // console.log(that.ReportreviewData)
        that.ReportmomentData = res.data.reportmoment
        console.log(that.ReportmomentData)
      })
    },
    viewReportreview(row) {
      console.log(row)
      this.ReporteditFormVisible = true
      this.reportreview = row
    },
    deleteReportreview(row) {
      this.ReportconferVisible = true
      this.reportreview = row
    },
    viewReportmoment(row) {
      console.log(row)
      this.ReporteditFormVisible = true
      this.reportmoment = row
      this.momentPhoto = row.moment.momentPhoto
      console.log(this.momentPhoto)
    },
    deleteReportmoment(row) {
      this.ReportconferVisible = true
      this.reportmoment = row
    },
    handlePicSuccess() {

    },
    handleUserDel() {
      const formData = new FormData()
      const that = this
      formData.append('userId', that.user.userId)
      axios.post('/api/admin/delete/user', formData, { headers: {
        'token': that.$store.state.admin.admintoken
      }}).then(function(res) {
        console.log(res.data)
        that.$message({
          type: 'success',
          message: '删除成功'
        })
      })
      that.getUser()
    },
    handleBookDel() {
      const formData = new FormData()
      const that = this
      formData.append('bookId', that.book.bookId)
      axios.post('/api/admin/book/delete', formData, { headers: {
        'token': that.$store.state.admin.admintoken
      }}).then(function(res) {
        console.log(res.data)
        that.$message({
          type: 'success',
          message: '删除成功'
        })
      })
      that.getBook()
    },
    handlePublisherDel() {
      const formData = new FormData()
      const that = this
      formData.append('publisherId', that.publisher.publisherId)
      axios.post('/api/admin/publisher/delete', formData, { headers: {
        'token': that.$store.state.admin.admintoken
      }}).then(function(res) {
        console.log(res.data)
        that.$message({
          type: 'success',
          message: '删除成功'
        })
      })
      that.getPublisher()
    },
    handleProducerDel() {
      const formData = new FormData()
      const that = this
      formData.append('producerId', that.producer.producerId)
      axios.post('/api/admin/producer/delete', formData, { headers: {
        'token': that.$store.state.admin.admintoken
      }}).then(function(res) {
        // console.log(res.data)
        // console.log(res.data.producers[0])
        // that.ProducerData = res.data.producers
        that.$message({
          type: 'success',
          message: '删除成功'
        })
      })
      that.getProducer()
    },
    handleAuthorDel() {
      const formData = new FormData()
      const that = this
      formData.append('authorId', that.author.authorId)
      axios.post('/api/admin/author/delete', formData, { headers: {
        'token': that.$store.state.admin.admintoken
      }}).then(function(res) {
        // console.log(res.data)
        // console.log(res.data.producers[0])
        // that.ProducerData = res.data.producers
        that.$message({
          type: 'success',
          message: '删除成功'
        })
      })
      that.getAuthor()
    },
    handleReviewDel() {
      const formData = new FormData()
      const that = this
      formData.append('reviewId', that.reportreview.reviewId)
      axios.post('/api/admin/delete/review', formData, { headers: {
        'token': that.$store.state.admin.admintoken
      }}).then(function(res) {
        that.$message({
          type: 'success',
          message: '删除成功'
        })
      })
      that.getReport()
    },
    handleMomentDel() {
      const formData = new FormData()
      const that = this
      formData.append('momentId', that.reportmoment.momentId)
      console.log(that.reportmoment.momentId)
      axios.post('/api/admin/delete/moment', formData, { headers: {
        'token': that.$store.state.admin.admintoken
      }}).then(function(res) {
        console.log(res.data)
        that.$message({
          type: 'success',
          message: '删除成功'
        })
      })
      that.getReport()
    },
    handleClose(done) {
      console.log('111Close')
      done()
      this.addFlag = true
      this.picUrl = ''
      this.getBook()
      this.getUser()
      this.getPublisher()
      this.getProducer()
      this.getAuthor()
      this.getReport()
      // this.book = ''
      // this.publisher = ''
      // this.producer = ''
    },
    // handleCancel(done) {
    //   done()
    //   this.UsereditFormVisible = false
    //   this.BookeditFormVisible = false
    //   this.PublishereditFormVisible = false
    //   this.ProducereditFormVisible = false
    //   this.AuthoreditFormVisible = false
    //   this.addFlag = true
    //   this.getBook()
    //   this.getUser()
    //   this.getPublisher()
    //   this.getProducer()
    //   this.book = ''
    //   this.publisher = ''
    //   this.producer = ''
    // },
    searchUser: function() {
      var searchuser = this.searchuser
      console.log(searchuser)
      console.log(this.UserData[2].userName)
      if (searchuser) {
        this.searchData = this.UserData.filter(value => value.userName.indexOf(this.searchuser) !== -1)
        console.log(this.searchData)
        this.UserData = this.searchData
      } else {
        this.getUser()
      }
    },
    searchAuthor: function() {
      var searchauthor = this.searchauthor
      console.log(searchauthor)
      if (searchauthor) {
        this.searchData = this.AuthorData.filter(value => value.authorName.indexOf(this.searchauthor) !== -1)
        console.log(this.searchData)
        this.AuthorData = this.searchData
      } else {
        this.getAuthor()
      }
    },
    searchPublisher: function() {
      var searchpublisher = this.searchpublisher
      console.log(searchpublisher)
      // this.getProducer()
      if (searchpublisher) {
        this.searchData = this.PublisherData.filter(value => value.publisherName.indexOf(this.searchpublisher) !== -1)
        console.log(this.searchData)
        this.PublisherData = this.searchData
      } else {
        this.getPublisher()
      }
    },
    searchProducer: function() {
      var searchproducer = this.searchproducer
      console.log(searchproducer)
      // this.getProducer()
      if (searchproducer) {
        this.searchData = this.ProducerData.filter(value => value.producerName.indexOf(this.searchproducer) !== -1)
        console.log(this.searchData)
        this.ProducerData = this.searchData
      } else {
        this.getProducer()
      }
    },
    searchBook: function() {
      var searchbook = this.searchbook
      // this.getBook()
      console.log(searchbook)
      if (searchbook) {
        this.searchData = this.BookData.filter(value => value.bookName.indexOf(this.searchbook) !== -1)
        console.log(this.searchData)
        this.BookData = this.searchData
      } else {
        this.getBook()
      }
    },
    exit() {
      this.$router.push('/admin/login')
    }
  }
}
</script>
<style lang="scss" scoped>
.wrap{
  position: relative;
  /* width:1024px;
  margin: 0 auto; */
  /* height: 100%; */
  /* padding-bottom: 47px; */
  position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    // min-height: 100%;
    height: auto;
    /* background: #000000; */
}
.left-bar{
  min-height: 100%;
}
// .left-bar div{
//   min-height: 100%;
// }
.header{
    background: #f2f2f2;
    width: 100%;
    height: 50px;
}
.bar-item{
  height: 100%;
}
.bar{
    height: 50px;
    width: 1024px;
    margin: 0 auto;
}
.addbutton{
  float: left;
  margin-left: 40px;
  margin-top: 10px;
}
.logo{
    width: 40px;
    height: 40px;
    float: left;
    margin-top: 4px;
    /* margin-left: 200px; */
}
.logo_pic{
    width: 40px;
    height: 40px;
}
.exit{
  width: 25px;
  height: 25px;
  float: right;
  margin-top: 15px;
  cursor: pointer;
}
.welcometext{
  margin-top: 200px;
  font-size: 30px;
}
.item-title{
  height: 40px;
  width: 110px;
  font-size: 20px;
  line-height: 50px;
  vertical-align: middle;
  float: left;
}
.info-table{
  margin: 10px 10px 5px 10px;
  /* width: 100%; */
  text-align: center;
  // height: 80%;
  // overflow: hidden;
}
.search-box{
  display: flex;
  margin: 10px 0 0 20px;
  width: 260px;
  float: left;
}
.search-icon{
  width: 50px;
  height: 30px;
  padding: 0;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  float: left;
  background: #409EFF;
  cursor: pointer;
}
.search-icon img{
  width: 20px;
  height: 20px;
  margin-top: 5px;
  text-align: center;
  vertical-align: middle;
}
.edit{
  width: 200px;
  height: 400px;
}
// .pagination{
//   position: absolute;
//   bottom: 50px;
//   left: 50%;
//   transform: translateX(-50%);
// }
.momentBigPhoto{
  width: 100%;
}
.momentBigPhoto img{
  display: flex;
  width: 100%;
  height: 250px;
  margin: 10px auto;
}
.report-tab{
  height: 100%;
}
::v-deep .report-tab>div>div>div{
  background-color: rgba(255, 255, 255, 0.664);
}
::v-deep .el-tabs__nav-scroll{
  /* width: 150px; */
  background-color: #304156;
  /* height: auto; */
}
::v-deep .el-tabs__nav{
  margin-top: 20px;
  /* height: 600px; */
}
::v-deep .el-tabs--left .el-tabs__item.is-left{
  text-align: center;
}
::v-deep .el-tabs__item{
  cursor: pointer;
  margin: 10px 0 10px 0;
  text-align: center;
  font-size: 16px;
  color: #BFCBD9;
}
::v-deep .el-tabs__content{
  height: 100%;
}
::v-deep .el-tabs__active-bar{
  height: 60px;
  transition:  transform .3s cubic-bezier(.645,.045,.355,1)
}
::v-deep .el-tabs--left .el-tabs__header.is-left{
  margin-right: 0;
}

::v-deep .el-icon-switch-button{
  text-align: center;
  font-size: 18px;
}
::v-deep .el-input__inner{
  height: 30px;
}
.picupload{
  width: 80px;
  height: 110px;
  background-color: #f3f3f3;
}
.userpic{
  width: 100px;
  height: 100px;
  border-radius: 100px;
}
.userPic{
  width: 100px;
  height: 100px;
  border-radius: 100px;
  // background-color: #c9c6c6;
}
.bookPic{
  border: dashed #bebebe 1px;
  background-color: #d6d6d6;
  width: 80px;
  height: 110px;
}
</style>
