"""Store hashed passwords as bytes

Revision ID: 711cb20260b7
Revises: 10c220a86969
Create Date: 2024-12-15 18:30:09.606828

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '711cb20260b7'
down_revision = '10c220a86969'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column(
            'password_hash',
            existing_type=sa.VARCHAR(length=256),
            type_=sa.LargeBinary(),
            existing_nullable=False,
        )

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column(
            'password_hash',
            existing_type=sa.LargeBinary(),
            type_=sa.VARCHAR(length=256),
            existing_nullable=False,
        )

    # ### end Alembic commands ###
