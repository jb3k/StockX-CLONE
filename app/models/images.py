# from .db import db


# class Image(db.Model):
#     __tablename__= "images"


#     id = db.Column(db.Integer, primary_key= True)
#     apparel_id = db.Column(db.Integer, db.ForeignKey("apparels.id"))
#     image_url = db.Column(db.String, nullable= False)


#     #relationships
#     #one-to-many... each item can have many images, an image cannot have many items
#     apparel = db.relationship("Apparel", back_populates="imgs")


#     def to_dict(self):
#         return {
#             "id": self.id,
#             "apparelId": self.apparel_id,
#             "imageUrl": self.image_url
#         }
