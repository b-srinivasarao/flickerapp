import { Avatar, Divider, Grid, Paper } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { State } from "../types/redux";
import dayjs from "dayjs";
var updateLocale = require("dayjs/plugin/updateLocale");
dayjs.extend(updateLocale);

export default function Comment() {
  const commentsData = useSelector((state: State) => state.flicker?.comments)
    ?.comments?.comment;
  if (!commentsData || !Object.keys(commentsData).length)
    return (
      <>
        <h1 style={{ padding: "0px 20px" }}>no comments</h1>
      </>
    );
  return (
    <>
      <h1 style={{ padding: "0px 20px" }}>Comments</h1>
      <Paper style={{ padding: "40px 20px", width: "50%" }}>
        {commentsData.map(
          (
            cmmt: {
              _content:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | React.ReactFragment
                | null
                | undefined;
              iconurls: { default: string | undefined };
              authorname:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | React.ReactFragment
                | React.ReactPortal
                | null
                | undefined;
              pro_badge:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | React.ReactFragment
                | React.ReactPortal
                | null
                | undefined;
              datecreate:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | React.ReactFragment
                | React.ReactPortal
                | null
                | undefined;
            },
            index: any
          ) => {
            let time = dayjs(156000 * 1000);
            return (
              <div key={index}>
                {" "}
                <Grid container wrap="nowrap" spacing={1}>
                  <Grid item>
                    <Avatar alt="Remy Sharp" src={cmmt.iconurls.default} />
                  </Grid>
                  <Grid justifyContent="left" item xs zeroMinWidth>
                    <div className="comment_profile">
                      <span
                        style={{
                          margin: 0,
                          textAlign: "left",
                          marginRight: 10,
                        }}
                      >
                        {cmmt.authorname}
                      </span>
                      <span
                        style={{
                          margin: 0,
                          textAlign: "left",
                          marginRight: 10,
                          color: "#006dac",
                        }}
                      >
                        {cmmt.pro_badge}
                      </span>
                      <span style={{ textAlign: "left", color: "gray" }}>
                        {dayjs(time).format("DD/MM/YYYY")}
                      </span>
                    </div>
                    <p style={{ textAlign: "left" }} className="cmmt_content">
                      {cmmt._content}
                    </p>
                  </Grid>
                </Grid>
                <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
              </div>
            );
          }
        )}
      </Paper>
    </>
  );
}
