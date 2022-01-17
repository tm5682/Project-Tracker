import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { IconButton, Typography } from "@mui/material";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";

const CardBorder = {
  border: "1px solid red",
};

function CardNote({ issue: { id, title, details, category }, handleDelete }) {
  return (
    <div>
      <Card
        elevation={1}
        sx={{
          ...(category == "issues" ? CardBorder : null),
        }}
      >
        <CardHeader
          action={
            <IconButton onClick={() => handleDelete(id)}>
              <DeleteOutlined />
            </IconButton>
          }
          title={title}
          subheader={category}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default CardNote;
